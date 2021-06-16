import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { userLoggedInSelector, listsSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { useGetLists } from 'hooks'
import List from 'components/List'
import LazyRender from 'components/LazyRender'

import style from './Lists.scss'

const Lists = () => {
  const lists = useGetLists()

  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const setLists = useSetRecoilState(listsSelector)

  const [renderedLists, setRenderedLists] = useState(lists.slice(0, RENDER_BATCH))

  const createList = async list => {
    const savedList = userLoggedIn
      ? (await ws.json({ type: 'createList', newList: list })).newList
      : { ...list, _id: Date.now().toString(), date: new Date().toISOString() }

    if (!savedList) return

    setLists([...lists, savedList])
  }

  const updatePin = async (listID, pinned) => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'updateListPin', listID, pinned: !pinned })

      if (status !== 'SUCCESS') return
    }

    setLists(lists.map(list => (list._id === listID ? { ...list, pinned: !pinned } : list)))
  }

  const checkItem = async (listID, index, item, updatedItems) => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'checkItem', listID, index, item })

      if (status !== 'SUCCESS') return
    }

    localStorage.setItem(
      userLoggedIn ? 'userLists' : 'lists',
      JSON.stringify(lists.map(list => (list._id === listID ? { ...list, items: updatedItems } : list)))
    )
  }

  const updateList = async list => {
    const updatedList = userLoggedIn
      ? (await ws.json({ type: 'updateList', updatedList: list })).updatedList
      : { ...list, date: new Date().toISOString() }

    if (!updatedList) return

    setLists(lists.map(list => (list._id === updatedList._id ? updatedList : list)))
  }

  const deleteList = async listID => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'deleteList', listID })

      if (status !== 'SUCCESS') return
    }

    setLists(lists.filter(({ _id }) => _id !== listID))
  }

  return (
    <div className={style.wrapper}>
      <List newList items={[{ value: '', checked: false }]} onCreateList={createList} />

      {renderedLists.map(({ _id, pinned, title, items, date }) => (
        <List
          key={_id}
          _id={_id}
          pinned={pinned}
          title={title}
          items={items}
          date={date}
          onUpdatePin={updatePin}
          onCheckItem={checkItem}
          onUpdateList={updateList}
          onDeleteList={deleteList}
        />
      ))}

      <LazyRender batch={RENDER_BATCH} items={lists} setItems={setRenderedLists} />
    </div>
  )
}

export default Lists
