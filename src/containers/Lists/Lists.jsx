import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useAxios } from 'frontend-essentials'

import { userLoggedInSelector } from 'containers/App/selectors'
import { listsSelector } from './selectors'
import Note from 'components/Note'

import style from './Lists.scss'

const Lists = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [lists, setLists] = useRecoilState(listsSelector)

  const { activate: getLists } = useAxios({
    url: '/lists',
    method: 'get',
    manual: true,
    onSuccess: ({ data }) => setLists(data)
  })
  const { activate: createList } = useAxios({
    url: '/lists',
    method: 'post',
    manual: true,
    onSuccess: ({ data }) => setLists(lists => [...lists, data])
  })
  const { activate: updatePin } = useAxios({
    url: '/list',
    method: 'patch',
    manual: true,
    onError: () => setLists(lists)
  })
  const { activate: checkItem } = useAxios({
    url: '/check-item',
    method: 'patch',
    manual: true,
    onError: () => setLists(lists)
  })
  const { activate: updateList } = useAxios({
    url: '/list',
    method: 'put',
    manual: true,
    onSuccess: ({ data }) => setLists(lists.map(list => (list._id === data._id ? data : list)))
  })
  const { activate: deleteList } = useAxios({
    url: '/list',
    method: 'delete',
    manual: true,
    onError: () => setLists(lists)
  })

  useEffect(() => {
    if (userLoggedIn) getLists()
  }, [userLoggedIn])

  const onCreateList = list => {
    if (userLoggedIn) return createList({ data: list })

    const localList = { ...list, _id: Date.now().toString(), date: new Date().toISOString() }

    setLists([...lists, localList])
  }

  const onUpdatePin = (listID, pinned) => {
    if (userLoggedIn) updatePin({ data: { listID, pinned: !pinned } })

    setLists(lists.map(list => (list._id === listID ? { ...list, pinned: !pinned } : list)))
  }

  const onCheckItem = (listID, index, item, updatedItems) => {
    if (userLoggedIn) checkItem({ data: { listID, index, item } })

    setLists(lists.map(list => (list._id === listID ? { ...list, items: updatedItems } : list)))
  }

  const onUpdateList = list => {
    if (userLoggedIn) return updateList({ data: list })

    const updatedLocalList = { ...list, date: new Date().toISOString() }

    setLists(lists.map(list => (list._id === updatedLocalList._id ? updatedLocalList : list)))
  }

  const onDeleteList = listID => {
    if (userLoggedIn) deleteList({ data: { listID } })

    setLists(lists.filter(({ _id }) => _id !== listID))
  }

  return (
    <div className={style.wrapper}>
      <Note variant="list" empty list items={[{ value: '', checked: false }]} onCreate={onCreateList} />

      {lists.map(({ _id, pinned, title, items, date }) => (
        <Note
          key={_id}
          variant="list"
          _id={_id}
          pinned={pinned}
          title={title}
          items={items}
          date={date}
          onUpdatePin={onUpdatePin}
          onCheckItem={onCheckItem}
          onUpdate={onUpdateList}
          onDelete={onDeleteList}
        />
      ))}
    </div>
  )
}

export default Lists
