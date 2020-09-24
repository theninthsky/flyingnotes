import store from './store'

import { modifyUser, passwordChanged } from './store/actions/user'
import { getNotes, setNotes, addNote, modifyNote, removeNote } from './store/actions/notes'
import { setFiles } from './store/actions/files'

const { REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env
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

export const createWebSocketConnection = (token, userID) => {
  ws = new WebSocket(REACT_APP_WS_SERVER_URL, token)

  ws.onopen = () => store.dispatch(getNotes())

  ws.onclose = () => window.location.reload()

  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data)

    store.dispatch(messageTypes[message.type](message))
  }

  ws.json = message => ws.send(JSON.stringify({ userID, ...message }))
}
