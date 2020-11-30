const { REACT_APP_SERVER_URL = 'http://localhost:5000', REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env
const RECONNECT_INTERVAL_IN_SECONDS = 1

export let ws
let resolvers = {}

export const createWebSocketConnection = () => {
  resolvers = {}

  return new Promise(async resolve => {
    try {
      const res = await fetch(`${REACT_APP_SERVER_URL}/get-new-token`, { credentials: 'include' })

      if (!res.ok) {
        localStorage.removeItem('name')
        window.location.reload()
      }

      const { bearerToken, userID } = await res.json()

      ws = new WebSocket(REACT_APP_WS_SERVER_URL, bearerToken)

      ws.onopen = resolve

      ws.onclose = () => createWebSocketConnection()

      ws.onmessage = ({ data }) => {
        const { messageID, ...message } = JSON.parse(data)

        resolvers[messageID](message)

        delete resolvers[messageID]
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
      setTimeout(createWebSocketConnection, RECONNECT_INTERVAL_IN_SECONDS * 1000)
    }
  })
}
