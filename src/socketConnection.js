import store from './store'

import { getNotes, setNotes } from './store/actions/notes'

const { REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env
const messageTypes = {
  getNotes: setNotes,
}

export let ws

export const createWebSocketConnection = (token, userID) => {
  ws = new WebSocket(REACT_APP_WS_SERVER_URL, token)

  ws.onopen = setTimeout(() => store.dispatch(getNotes()), 100)

  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data)

    store.dispatch(messageTypes[message.type](message))
  }

  ws.json = message => ws.send(JSON.stringify({ userID, ...message }))
}
