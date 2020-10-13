import store from './store'
import { modifyUser, passwordChanged } from './store/actions/user'
import { setNotes, addNote, modifyNote, removeNote } from './store/actions/notes'
import { setFiles } from './store/actions/files'

const { REACT_APP_SERVER_URL = 'http://localhost:5000', REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env
const messageTypes = {
  updateUser: modifyUser,
  changePassword: passwordChanged,
  getNotes: setNotes,
  createNote: addNote,
  updateNote: modifyNote,
  deleteNote: removeNote,
  getFiles: setFiles,
}

export let ws

export const createWebSocketConnection = message => {
  if (!localStorage.name) return

  return new Promise(async resolve => {
    const res = await fetch(`${REACT_APP_SERVER_URL}/get-new-token`, { credentials: 'include' })

    if (!res.ok) {
      localStorage.removeItem('name')
      window.location.reload()
    }

    const { bearerToken, userID } = await res.json()

    ws = new WebSocket(REACT_APP_WS_SERVER_URL, bearerToken)

    ws.onopen = () => {
      if (message) ws.json(message)

      resolve()
    }

    // ws.onclose = () => { }

    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data)

      store.dispatch(messageTypes[message.type](message))
    }

    ws.json = async message => {
      if (ws.readyState !== 1) return createWebSocketConnection(message)

      ws.send(JSON.stringify({ userID, ...message }))
    }
  })
}
