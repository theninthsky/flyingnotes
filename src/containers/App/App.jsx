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

document.documentElement.setAttribute('data-theme', localStorage.theme || 'dark')

const App = () => {
  const [user, setUser] = useState(null)
  const [registrationWaiting, setRegistrationWaiting] = useState()
  const [prevLocation, setPrevLocation] = useState()
  const [currLocation, setCurrLocation] = useState()
  const [authVisible, setAuthVisible] = useState(false)
  const [notesCollectionRef, setNotesCollectionRef] = useState()
  const [listsCollectionRef, setListsCollectionRef] = useState()
  const [filesListRef, setFilesListRef] = useState()
  const [notes, setNotes] = useState([])
  const [lists, setLists] = useState([])
  const [files, setFiles] = useState([])

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

    onAuthStateChanged(auth, setUser)
    window.addEventListener('serviceworkerupdate', handleRegistration)

    return () => window.removeEventListener('serviceworkerupdate', handleRegistration)
  }, [])

  useEffect(() => {
    if (!user) return

    const { uid } = user

    setNotesCollectionRef(collection(db, `users/${uid}/notes`))
    setListsCollectionRef(collection(db, `users/${uid}/lists`))
    setFilesListRef(ref(storage, uid))
  }, [user])

  useEffect(() => {
    if (!notesCollectionRef || !listsCollectionRef) {
      setNotes([])
      return setLists([])
    }

    const unsubscribeNotes = onSnapshot(
      query(notesCollectionRef, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        setNotes(snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() })))
      }
    )

    const unsubscribeLists = onSnapshot(
      query(listsCollectionRef, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        setLists(snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() })))
      }
    )

    return () => {
      unsubscribeNotes()
      unsubscribeLists()
    }
  }, [notesCollectionRef, listsCollectionRef])

  useEffect(() => {
    filesListRef ? getFiles() : setFiles([])
  }, [filesListRef])

  useEffect(() => {
    setPrevLocation(currLocation)
    setCurrLocation(location.pathname)
  }, [location])

  const getFiles = async () => {
    const { items } = await listAll(filesListRef)

    setFiles(
      items.map(item => {
        const [name, extension] = item.name.split('.')

        return { itemRef: item, id: item.name, name, extension }
      })
    )
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

  return (
    <>
      <If condition={window.matchMedia('(display-mode: standalone)').matches && registrationWaiting}>
        <UpdateAlert onClick={replaceSW} />
      </If>

      <NavigationBar user={user} authVisible={authVisible} setAuthVisible={setAuthVisible} />

      <If condition={authVisible}>
        {user ? (
          <User user={user} onClose={() => setAuthVisible(false)} />
        ) : (
          <Auth onClose={() => setAuthVisible(false)} />
        )}
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
