const { REACT_APP_SERVER_URL = 'http://localhost:5000', REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env

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
