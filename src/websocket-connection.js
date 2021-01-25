import ReconnectingWebSocket from 'reconnecting-websocket'

const { REACT_APP_SERVER_URL = 'http://localhost:5000', REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env

export let ws
let resolvers = {}

export const createWebSocketConnection = () => {
  resolvers = {}

  return new Promise(async resolve => {
    try {
      const res = await fetch(`${REACT_APP_SERVER_URL}/renew-token`, { mode: 'cors', credentials: 'include' })

      if (res.status === 401) throw Error('UNAUTHORIZED')

      const { userID } = await res.json()

      ws = new ReconnectingWebSocket(REACT_APP_WS_SERVER_URL)

      ws.onopen = resolve

      ws.onmessage = ({ data }) => {
        const { messageID, ...message } = JSON.parse(data)

        resolvers[messageID](message)

        delete resolvers[messageID]
      }

      ws.destroy = () => {
        ws = undefined
      }

      ws.json = message => {
        return new Promise(resolve => {
          const messageID = Math.floor((1 + Math.random()) * 0x100000000)
            .toString(16)
            .slice(1)

          resolvers[messageID] = resolve

          ws.send(JSON.stringify({ messageID, userID, ...message }))
        })
      }
    } catch (err) {
      if (err.message === 'UNAUTHORIZED') {
        localStorage.removeItem('user')
        return window.location.reload()
      }

      createWebSocketConnection()
    }
  })
}
