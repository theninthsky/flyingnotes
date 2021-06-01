import ReconnectingWebSocket from 'reconnecting-websocket'

import { renewTokenService } from 'services'

const { WS_SERVER_URL } = process.env

export let ws
let resolvers = {}

export const createWebSocketConnection = () => {
  resolvers = {}

  return new Promise(async resolve => {
    try {
      const res = await renewTokenService()

      if (res.status === 401) throw Error('UNAUTHORIZED')

      const { userID } = await res.json()

      ws = new ReconnectingWebSocket(`${WS_SERVER_URL}?${localStorage.token}`)

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
