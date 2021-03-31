import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { listsState } from 'atoms'
import { userLoggedInSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { useGetLists } from 'hooks'
import { List, LazyRender } from 'components'
import { ListsWrap } from './style'

const Lists = () => {
  const lists = useGetLists()

  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const setLists = useSetRecoilState(listsState)

  const [renderedLists, setRenderedLists] = useState(lists.slice(0, RENDER_BATCH))

  const createList = async list => {
    let savedList

    if (userLoggedIn) {
      savedList = (await ws.json({ type: 'createList', newList: list })).newList

      if (!savedList) return

      localStorage.setItem('userLists', JSON.stringify([...lists, savedList]))
    } else {
      savedList = { ...list, _id: Date.now().toString(), date: new Date().toISOString() }
      localStorage.setItem('lists', JSON.stringify([...lists, savedList]))
    }

    setLists([...lists, savedList])
  }

  const updatePin = async (listID, pinned) => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'updateListPin', listID, pinned: !pinned })

      if (status !== 'SUCCESS') return

      localStorage.setItem(
        'userLists',
        JSON.stringify(lists.map(list => (list._id === listID ? { ...list, pinned: !pinned } : list)))
      )
    } else {
      localStorage.setItem(
        'lists',
        JSON.stringify(lists.map(list => (list._id === listID ? { ...list, pinned: !pinned } : list)))
      )
    }

    setLists(lists.map(list => (list._id === listID ? { ...list, pinned: !pinned } : list)))
  }

  const checkItem = async (listID, index, item, updatedItems) => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'checkItem', listID, index, item })

      if (status !== 'SUCCESS') return

      localStorage.setItem(
        'userLists',
        JSON.stringify(lists.map(list => (list._id === listID ? { ...list, items: updatedItems } : list)))
      )
    } else {
      localStorage.setItem(
        'lists',
        JSON.stringify(lists.map(list => (list._id === listID ? { ...list, items: updatedItems } : list)))
      )
    }
  }

  const updateList = async list => {
    let updatedList

    if (userLoggedIn) {
      updatedList = (await ws.json({ type: 'updateList', updatedList: list })).updatedList
      localStorage.setItem(
        'userLists',
        JSON.stringify(lists.map(list => (list._id === updatedList._id ? updatedList : list)))
      )
    } else {
      updatedList = { ...list, date: new Date().toISOString() }
      localStorage.setItem(
        'lists',
        JSON.stringify(lists.map(list => (list._id === updatedList._id ? updatedList : list)))
      )
    }

    setLists(
      lists.map(originalList =>
        originalList._id === list._id ? { ...list, date: new Date().toISOString() } : originalList
      )
    )
  }

  const deleteList = async listID => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'deleteList', listID })

      if (status === 'SUCCESS') {
        setLists(lists.filter(({ _id }) => _id !== listID))
        localStorage.setItem('userLists', JSON.stringify(lists.filter(({ _id }) => _id !== listID)))
      }
    } else {
      localStorage.setItem('lists', JSON.stringify(lists.filter(({ _id }) => _id !== listID)))
    }

    setLists(lists.filter(({ _id }) => _id !== listID))
  }

  return (
    <ListsWrap>
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
    </ListsWrap>
  )
}

export default Lists
