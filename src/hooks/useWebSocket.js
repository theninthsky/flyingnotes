import { useState, useEffect } from 'react'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userLoggedInSelector } from 'containers/App/selectors'

const useWebSocket = ({ type, ...data }) => {
  const history = useHistory()

  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [response, setResponse] = useState()

  useEffect(() => {
    if (!userLoggedIn) return history.replace('/')

    send()
  }, [history, userLoggedIn])

  const send = async () => {
    if (!ws) await createWebSocketConnection() // problem

    const response = await ws.json({ type, ...data })

    setResponse(response)
  }

  return response
}

export default useWebSocket
