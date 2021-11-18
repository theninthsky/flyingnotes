import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { ref, listAll } from 'firebase/storage'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useSwipeable } from 'react-swipeable'
import { Helmet } from 'react-helmet'
import { If, useViewport } from 'frontend-essentials'

import { auth, db, storage } from 'firebase-app'
import Notes from 'containers/Notes'
import Lists from 'containers/Lists'
import NavigationBar from 'components/NavigationBar'
import Auth from 'components/Auth'
import User from 'components/User'
import UpdateAlert from 'components/UpdateAlert'

import style from './App.scss'

const Files = lazy(() => import(/* webpackPrefetch: true */ 'containers/Files'))

const routes = ['/', '/lists', '/files']

document.documentElement.setAttribute('data-theme', localStorage.theme || 'light')

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.user || null))
  const [registrationWaiting, setRegistrationWaiting] = useState()
  const [prevLocation, setPrevLocation] = useState()
  const [currLocation, setCurrLocation] = useState()
  const [authVisible, setAuthVisible] = useState(false)
  const [notesCollectionRef, setNotesCollectionRef] = useState()
  const [listsCollectionRef, setListsCollectionRef] = useState()
  const [filesListRef, setFilesListRef] = useState()
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes || '[]'))
  const [lists, setLists] = useState(JSON.parse(localStorage.lists || '[]'))
  const [files, setFiles] = useState(JSON.parse(localStorage.files || '[]'))
  const [cleanupUser, setCleanupUser] = useState(() => {})

  const navigate = useNavigate()
  const location = useLocation()
  const { mobile } = useViewport({ mobile: '(max-width: 991px)' })
  const handlers = useSwipeable({
    onSwipedLeft: () => changeRoute('right'),
    onSwipedRight: () => changeRoute('left'),
    preventDefaultTouchmoveEvent: true,
    delta: 100
  })

  useEffect(() => {
    const handleRegistration = ({ detail: registration }) => setRegistrationWaiting(registration.waiting)

    onAuthStateChanged(auth, user => {
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    })
    window.addEventListener('serviceworkerupdate', handleRegistration)

    return () => window.removeEventListener('serviceworkerupdate', handleRegistration)
  }, [])

  useEffect(() => {
    const { uid } = user || {}

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

    setCleanupUser(() => () => {
      unsubscribeNotes()
      unsubscribeLists()
      setNotes([])
      setLists([])
      setFiles([])
      localStorage.clear()
    })
  }, [notesCollectionRef, listsCollectionRef])

  useEffect(() => {
    if (filesListRef) getFiles()
  }, [filesListRef])

  useEffect(() => {
    setPrevLocation(currLocation)
    setCurrLocation(location.pathname)
  }, [location])

  const getFiles = async () => {
    const { items } = await listAll(filesListRef)
    const files = items.map(item => {
      const [name, extension] = item.name.split('.')

      return { itemRef: item, id: item.name, name, extension }
    })

    setFiles(files)
    localStorage.setItem('files', JSON.stringify(files))
  }

  const changeRoute = dir => {
    const index = routes.indexOf(currLocation)

    if (dir === 'left' && routes[index - 1]) navigate(routes[index - 1])
    if (dir === 'right' && routes[index + 1]) navigate(routes[index + 1])
  }

  const replaceSW = () => {
    if (!registrationWaiting) return

    registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
    registrationWaiting.addEventListener('statechange', event => {
      if (event.target.state === 'activated') window.location.reload()
    })
  }

  const transitionDirection = routes.indexOf(currLocation) > routes.indexOf(prevLocation) ? 'left' : 'right'
  const transitionOptions = mobile
    ? { key: location.key, timeout: 200, classNames: { ...style } }
    : { timeout: 0, classNames: '' }

  if (!user) return <Auth />

  return (
    <>
      <If condition={window.matchMedia('(display-mode: standalone)').matches && registrationWaiting}>
        <UpdateAlert onClick={replaceSW} />
      </If>

      <NavigationBar user={user} authVisible={authVisible} setAuthVisible={setAuthVisible} />

      <If condition={authVisible}>
        <User user={user} cleanupUser={cleanupUser} onClose={() => setAuthVisible(false)} />
      </If>

      <TransitionGroup className={style[transitionDirection]}>
        <CSSTransition {...transitionOptions}>
          <Routes location={location}>
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

                  <Lists collectionRef={listsCollectionRef} lists={lists} />
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
                    <Files user={user} files={files} getFiles={getFiles} />
                  </Suspense>
                </div>
              }
            />

            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default App
