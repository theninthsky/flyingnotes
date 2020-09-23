const { REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env

const messageTypes = {
  getNotes: '',
}

export const createWebSocketConnection = token => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(REACT_APP_WS_SERVER_URL, token)

    ws.onopen = resolve

    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data)

      messageTypes[message.type].next(message)
    }

    ws.json = message => ws.send(JSON.stringify(message))
  })
}
