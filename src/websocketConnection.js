import store from './store'
// import { modifyUser, passwordChanged } from './store/actions/user'
import { addNote, modifyNote, removeNote } from './store/actions/notes'
import { setFiles, addFile, addAttachment, removeFile } from './store/actions/files'

const { REACT_APP_SERVER_URL = 'http://localhost:5000', REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env
const messageTypes = {
  // updateUser: modifyUser,
  // changePassword: passwordChanged,
  createNote: addNote,
  updateNote: modifyNote,
  deleteNote: removeNote,
  getFiles: setFiles,
  uploadFile: addFile,
  downloadFile: addAttachment,
  deleteFile: removeFile,
}

export let ws
let resolver

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

    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data)

      resolver(message)

      try {
        store.dispatch(messageTypes[message.type](message))
      } catch (err) {}
    }

    ws.json = async message => {
      if (ws.readyState !== 1) return createWebSocketConnection(message)

      return new Promise(resolve => {
        resolver = resolve

        ws.send(JSON.stringify({ userID, ...message }))
      })
    }
  })
}
