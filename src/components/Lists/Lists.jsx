import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userState } from 'atoms'
import { listsSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { List, LazyRender } from 'components'
import { ListsWrap } from './style'

const Lists = () => {
  const user = useRecoilValue(userState)
  const [lists, setLists] = useRecoilState(listsSelector)

  const [renderedLists, setRenderedLists] = useState(lists.slice(0, RENDER_BATCH))

  useEffect(() => {
    const getLists = async () => {
      if (!ws) await createWebSocketConnection()

      const { lists } = await ws.json({ type: 'getLists' })

      setLists(lists)
      localStorage.userLists = JSON.stringify(lists)
    }

    if (user.name) getLists()
  }, [user.name, setLists])

  return (
    <ListsWrap>
      <List newList items={[{ value: '', checked: false }]} />

      {renderedLists.map(({ _id, pinned, title, items }) => (
        <List key={_id} _id={_id} pinned={pinned} title={title} items={items} date={Date.now()} />
      ))}

      <LazyRender batch={RENDER_BATCH} items={lists} setItems={setRenderedLists} />
    </ListsWrap>
  )
}

export default Lists
