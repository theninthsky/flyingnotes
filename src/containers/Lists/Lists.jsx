import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LazyRender, useAxios, useViewport } from 'frontend-essentials'

import { userLoggedInSelector } from 'containers/App/selectors'
import { listsSelector } from './selectors'
import Note, { TYPE_LIST } from 'components/Note'

import style from './Lists.scss'

const Lists = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [lists, setLists] = useRecoilState(listsSelector)

  const [loadingListID, setLoadingListID] = useState()

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  const { activate: getLists } = useAxios({
    url: '/lists',
    method: 'get',
    manual: true,
    onSuccess: ({ data }) => setLists(data)
  })
  const { loading: creatingList, activate: createList } = useAxios({ url: '/lists', method: 'post', manual: true })
  const { activate: updatePin } = useAxios({ url: '/list', method: 'patch', manual: true })
  const { activate: checkItem } = useAxios({ url: '/check-item', method: 'patch', manual: true })
  const { activate: updateList } = useAxios({
    url: '/list',
    method: 'put',
    manual: true,
    onSuccess: ({ data }) => {
      setLoadingListID()
      setLists(lists.map(list => (list._id === data._id ? data : list)))
    }
  })
  const { activate: deleteList } = useAxios({ url: '/list', method: 'delete', manual: true })

  useEffect(() => {
    if (userLoggedIn) getLists()
  }, [userLoggedIn])

  const onCreateList = (list, reset) => {
    if (userLoggedIn) {
      return createList({
        data: list,
        onSuccess: ({ data }) => {
          setLists(lists => [...lists, data])
          reset()
        }
      })
    }

    const localList = { ...list, _id: Date.now().toString(), date: new Date().toISOString() }

    setLists([...lists, localList])
  }

  const onUpdatePin = (listID, pinned) => {
    if (!userLoggedIn) return setLists(lists.map(list => (list._id === listID ? { ...list, pinned: !pinned } : list)))

    updatePin({
      data: { listID, pinned: !pinned },
      onSuccess: () => setLists(lists.map(list => (list._id === listID ? { ...list, pinned: !pinned } : list)))
    })
  }

  const onCheckItem = (listID, index, item, updatedItems) => {
    if (!userLoggedIn) {
      return setLists(lists.map(list => (list._id === listID ? { ...list, items: updatedItems } : list)))
    }

    checkItem({
      data: { listID, index, item },
      onSuccess: () => setLists(lists.map(list => (list._id === listID ? { ...list, items: updatedItems } : list)))
    })
  }

  const onUpdateList = list => {
    if (userLoggedIn) {
      setLoadingListID(list._id)
      return updateList({ data: list })
    }

    const updatedLocalList = { ...list, date: new Date().toISOString() }

    setLists(lists.map(list => (list._id === updatedLocalList._id ? updatedLocalList : list)))
  }

  const onDeleteList = listID => {
    if (!userLoggedIn) return setLists(lists.filter(({ _id }) => _id !== listID))

    setLoadingListID(listID)
    deleteList({
      data: { listID },
      onSuccess: () => {
        setLoadingListID()
        setLists(lists.filter(({ _id }) => _id !== listID))
      }
    })
  }

  return (
    <div className={style.wrapper}>
      <Note
        variant={TYPE_LIST}
        empty
        list
        items={[{ value: '', checked: false }]}
        loading={creatingList}
        onCreate={onCreateList}
      />

      <LazyRender items={lists} batch={viewport12 ? 20 : 8} rootMargin="100%">
        {({ _id, pinned, title, items, date }) => (
          <Note
            key={_id}
            variant={TYPE_LIST}
            _id={_id}
            pinned={pinned}
            title={title}
            items={items}
            date={date}
            loading={_id === loadingListID}
            onUpdatePin={onUpdatePin}
            onCheckItem={onCheckItem}
            onUpdate={onUpdateList}
            onDelete={onDeleteList}
          />
        )}
      </LazyRender>
    </div>
  )
}

export default Lists
