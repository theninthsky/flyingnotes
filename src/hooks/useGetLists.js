import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userState } from 'atoms'
import { listsSelector } from 'selectors'

export const useGetLists = () => {
  const user = useRecoilValue(userState)
  const [lists, setLists] = useRecoilState(listsSelector)

  useEffect(() => {
    const getLists = async () => {
      if (!ws) await createWebSocketConnection()

      const { lists } = await ws.json({ type: 'getLists' })

      setLists(lists)
      localStorage.userLists = JSON.stringify(lists)
    }

    if (user.name) getLists()
  }, [user.name, setLists])

  return lists
}
