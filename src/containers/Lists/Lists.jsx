import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { collection, query, orderBy, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { LazyRender, useViewport } from 'frontend-essentials'

import { db } from 'firebase-app'
import { userState } from 'containers/App/atoms'
import Note, { TYPE_LIST } from 'components/Note'

import style from './Lists.scss'

const Lists = () => {
  const user = useRecoilValue(userState)

  const [collectionRef, setCollectionRef] = useState()
  const [lists, setLists] = useState([])

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  useEffect(() => {
    setCollectionRef(user ? collection(db, `users/${user.uid}/lists`) : undefined)
  }, [user])

  useEffect(() => {
    if (!collectionRef) return setLists([])

    const unsubscribe = onSnapshot(
      query(collectionRef, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        setLists(snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() })))
      }
    )

    return unsubscribe
  }, [collectionRef])

  const onCreateList = async (list, reset) => {
    if (!collectionRef) return

    addDoc(collectionRef, list)
    reset()
  }

  const onUpdateList = (list, documentRef) => {
    if (documentRef) updateDoc(documentRef, list)
  }

  const onDeleteList = documentRef => {
    if (collectionRef) deleteDoc(documentRef)
  }

  return (
    <div className={style.wrapper}>
      <Note variant={TYPE_LIST} empty list items={[{ value: '', checked: false }]} onCreate={onCreateList} />

      <LazyRender items={lists} batch={viewport12 ? 20 : 8} rootMargin="100%">
        {({ documentRef, id, pinned, title, items, date }) => (
          <Note
            key={id}
            variant={TYPE_LIST}
            pinned={pinned}
            title={title}
            items={items}
            date={date}
            onUpdate={list => onUpdateList(list, documentRef)}
            onDelete={() => onDeleteList(documentRef)}
          />
        )}
      </LazyRender>
    </div>
  )
}

export default Lists
