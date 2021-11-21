import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, listAll } from 'firebase/storage'
import { useSwipeable } from 'react-swipeable'
import { Helmet } from 'react-helmet'

import app from 'firebase-app'
import Notes from 'containers/Notes'

import style from './Main.scss'

const Lists = lazy(() =>
  import(
    /* webpackChunkName: 'lists' */
    /* webpackPrefetch: true */
    'containers/Lists'
  )
)
const Files = lazy(() =>
  import(
    /* webpackChunkName: 'files' */
    /* webpackPrefetch: true */
    'containers/Files'
  )
)

const db = getFirestore(app)
const storage = getStorage(app)

const Main = ({ user, setOnLogout, onChangeRoute }) => {
  const [notesCollectionRef, setNotesCollectionRef] = useState()
  const [listsCollectionRef, setListsCollectionRef] = useState()
  const [filesListRef, setFilesListRef] = useState()
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes || '[]'))
  const [lists, setLists] = useState(JSON.parse(localStorage.lists || '[]'))
  const [files, setFiles] = useState(JSON.parse(localStorage.files || '[]'))

  const handlers = useSwipeable({
    onSwipedLeft: () => onChangeRoute('right'),
    onSwipedRight: () => onChangeRoute('left'),
    preventDefaultTouchmoveEvent: true,
    delta: 100
  })

  useEffect(() => {
    if (!user) return

    const { uid } = user

    setNotesCollectionRef(uid ? collection(db, `users/${uid}/notes`) : undefined)
    setListsCollectionRef(uid ? collection(db, `users/${uid}/lists`) : undefined)
    setFilesListRef(uid ? ref(storage, uid) : undefined)
  }, [user])

  useEffect(() => {
    if (!notesCollectionRef || !listsCollectionRef) return

    const unsubscribeNotes = onSnapshot(
      query(notesCollectionRef, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        const notes = snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() }))

        setNotes(notes)
        localStorage.setItem('notes', JSON.stringify(notes))
      }
    )

    const unsubscribeLists = onSnapshot(
      query(listsCollectionRef, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        const lists = snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() }))

        setLists(lists)
        localStorage.setItem('lists', JSON.stringify(lists))
      }
    )

    setOnLogout(() => () => {
      unsubscribeNotes()
      unsubscribeLists()
      setNotes([])
      setLists([])
      setFiles([])
      localStorage.removeItem('notes')
      localStorage.removeItem('lists')
      localStorage.removeItem('files')
    })
  }, [notesCollectionRef, listsCollectionRef])

  const getFiles = async () => {
    const { items } = await listAll(filesListRef)
    const files = items.map(item => {
      const [name, extension] = item.name.split('.')

      return { itemRef: item, id: item.name, name, extension }
    })

    setFiles(files)
    localStorage.setItem('files', JSON.stringify(files))
  }

  useEffect(() => {
    if (filesListRef) getFiles()
  }, [filesListRef])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={style.page} {...handlers}>
            <Helmet>
              <title>My Notes</title>
            </Helmet>

            <Notes collectionRef={notesCollectionRef} notes={notes} />
          </div>
        }
      />

      <Route
        path="/lists"
        element={
          <div className={style.page} {...handlers}>
            <Helmet>
              <title>My Lists</title>
            </Helmet>

            <Suspense fallback={<></>}>
              <Lists collectionRef={listsCollectionRef} lists={lists} />
            </Suspense>
          </div>
        }
      />

      <Route
        path="/files"
        element={
          <div className={style.page} {...handlers}>
            <Helmet>
              <title>My Files</title>
            </Helmet>

            <Suspense fallback={<></>}>
              <Files user={user} storage={storage} files={files} getFiles={getFiles} />
            </Suspense>
          </div>
        }
      />

      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default Main
