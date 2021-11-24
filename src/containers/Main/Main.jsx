import { useState, useRef, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, listAll } from 'firebase/storage'
import { useSwipeable } from 'react-swipeable'
import { Helmet } from 'react-helmet'

import app from 'firebase-app'
import Notes from 'containers/Notes'
import Lists from 'containers/Lists'
import Files from 'containers/Files'

import style from './Main.scss'

const db = getFirestore(app)
const storage = getStorage(app)

const Main = ({ user, onLogoutRef, onChangeRoute }) => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes || '[]'))
  const [lists, setLists] = useState(JSON.parse(localStorage.lists || '[]'))
  const [files, setFiles] = useState(JSON.parse(localStorage.files || '[]'))

  const notesCollectionRef = useRef()
  const listsCollectionRef = useRef()
  const filesListRef = useRef()

  const handlers = useSwipeable({
    onSwipedLeft: () => onChangeRoute('right'),
    onSwipedRight: () => onChangeRoute('left'),
    preventDefaultTouchmoveEvent: true,
    delta: 100
  })

  useEffect(() => {
    const { uid } = user

    notesCollectionRef.current = collection(db, `users/${uid}/notes`)
    listsCollectionRef.current = collection(db, `users/${uid}/lists`)
    filesListRef.current = ref(storage, uid)

    const unsubscribeNotes = onSnapshot(
      query(notesCollectionRef.current, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        const notes = snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() }))

        setNotes(notes)
        localStorage.setItem('notes', JSON.stringify(notes))
      }
    )

    const unsubscribeLists = onSnapshot(
      query(listsCollectionRef.current, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        const lists = snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() }))

        setLists(lists)
        localStorage.setItem('lists', JSON.stringify(lists))
      }
    )

    onLogoutRef.current = () => {
      unsubscribeNotes()
      unsubscribeLists()
      localStorage.removeItem('notes')
      localStorage.removeItem('lists')
      localStorage.removeItem('files')
    }
  }, [])

  const getFiles = async () => {
    const { items } = await listAll(filesListRef.current)
    const files = items.map(item => {
      const [name, extension] = item.name.split('.')

      return { itemRef: item, id: item.name, name, extension }
    })

    setFiles(files)
    localStorage.setItem('files', JSON.stringify(files))
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={style.page} {...handlers}>
            <Helmet>
              <title>My Notes</title>
            </Helmet>

            <Notes collectionRef={notesCollectionRef.current} notes={notes} />
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

            <Lists collectionRef={listsCollectionRef.current} lists={lists} />
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

            <Files
              user={user}
              storage={storage}
              filesListRef={filesListRef.current}
              files={files}
              getFiles={getFiles}
            />
          </div>
        }
      />

      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default Main
