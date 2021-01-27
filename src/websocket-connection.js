import ReconnectingWebSocket from 'reconnecting-websocket'

import { safari } from 'util/user-agent'

const { REACT_APP_SERVER_URL = 'http://localhost:5000', REACT_APP_WS_SERVER_URL = 'ws://localhost:5000' } = process.env

export let ws
let resolvers = {}

const renewToken = () => {
  if (!safari) return fetch(`${REACT_APP_SERVER_URL}/renew-token`, { credentials: 'include' })

  const token = `Bearer=${localStorage.token}`

  return fetch(`${REACT_APP_SERVER_URL}/renew-token`, { headers: { authorization: token } })
}

export const createWebSocketConnection = () => {
  resolvers = {}

  return new Promise(async resolve => {
    try {
      const res = await renewToken()

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
