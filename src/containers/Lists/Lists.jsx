import { useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { LazyRender } from '@theninthsky/react-essentials'

import { ws } from 'websocket-connection'
import { userLoggedInSelector } from 'containers/App/selectors'
import { listsSelector } from './selectors'
import { RENDER_BATCH } from './constants'
import useGetLists from 'hooks/useGetLists'
import Note from 'components/Note'

import style from './Lists.scss'

const Lists = () => {
  const lists = useGetLists()

  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const setLists = useSetRecoilState(listsSelector)

  const targetRef = useRef()

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
    const { updatedList } = userLoggedIn
      ? await ws.json({ type: 'updateList', updatedList: list })
      : { updatedList: { ...list, date: new Date().toISOString() } }

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
      <Note variant="list" empty list items={[{ value: '', checked: false }]} onCreate={createList} />

      <LazyRender items={lists} batch={RENDER_BATCH} targetRef={targetRef}>
        {({ _id, pinned, title, items, date }) => (
          <Note
            key={_id}
            variant="list"
            _id={_id}
            pinned={pinned}
            title={title}
            items={items}
            date={date}
            onUpdatePin={updatePin}
            onCheckItem={checkItem}
            onUpdate={updateList}
            onDelete={deleteList}
          />
        )}
      </LazyRender>

      <div ref={targetRef}></div>
    </div>
  )
}

export default Lists
