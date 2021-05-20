import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userLoggedInSelector, listsSelector } from 'selectors'

export const useGetLists = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [lists, setLists] = useRecoilState(listsSelector)

  useEffect(() => {
    const getLists = async () => {
      if (!ws) await createWebSocketConnection()

      const { lists } = await ws.json({ type: 'getLists' })

      setLists(lists)
    }

    if (userLoggedIn) getLists()
  }, [userLoggedIn, setLists])

  return lists
}
