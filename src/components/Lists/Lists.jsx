import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { ANIMATION_DURATION } from 'media-queries'
import { userState } from 'atoms'
import { listsSelector } from 'selectors'
import { RENDER_LIMIT } from './constants'
import List from 'components/List'
import { ListsWrap } from './style'

const Lists = () => {
  const user = useRecoilValue(userState)
  const [lists, setLists] = useRecoilState(listsSelector)

  const [renderLimit, setRenderLimit] = useState(RENDER_LIMIT)

  useEffect(() => {
    const renderLimitTimeout = setTimeout(() => setRenderLimit(Infinity), ANIMATION_DURATION + 50)

    return () => clearTimeout(renderLimitTimeout)
  }, [])

  useEffect(() => {
    const getLists = async () => {
      if (!ws) await createWebSocketConnection()

      const { lists } = await ws.json({ type: 'getLists' })

      setLists(lists)
      localStorage.userLists = JSON.stringify(lists)
    }

    //if (user.name) getLists()
  }, [user.name, setLists])

  const dummyLists = [
    {
      _id: '4234235235',
      pinned: true,
      title: 'קניות',
      items: [
        { value: 'מלפפון', checked: true },
        { value: 'עגבנייה', checked: false }
      ]
    }
  ]

  return (
    <ListsWrap>
      <List newList />
      {dummyLists.slice(0, renderLimit).map(({ _id, pinned, title, items }) => (
        <List key={_id} id={_id} pinned={pinned} title={title} items={items} date={Date.now()} />
      ))}
    </ListsWrap>
  )
}

export default Lists
