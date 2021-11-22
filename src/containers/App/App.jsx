import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { If, useViewport } from 'frontend-essentials'

import app from 'firebase-app'
import NavigationBar from 'components/NavigationBar'
import Auth from 'components/Auth'
import UpdateAlert from 'components/UpdateAlert'
import UserTooltip from 'components/UserTooltip'

import style from './App.scss'

const Main = lazy(() =>
  import(
    /* webpackChunkName: 'main-container' */
    /* webpackPrefetch: true */
    'containers/Main'
  )
)

const auth = getAuth(app)
const routes = ['/', '/lists', '/files']

document.documentElement.setAttribute('data-theme', localStorage.theme || 'light')

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.user || null))
  const [registrationWaiting, setRegistrationWaiting] = useState()
  const [prevLocation, setPrevLocation] = useState()
  const [currLocation, setCurrLocation] = useState()

  const onLogoutRef = useRef(() => {})
  const navigate = useNavigate()
  const location = useLocation()
  const { mobile } = useViewport({ mobile: '(max-width: 991px)' })

  useEffect(() => {
    const handleRegistration = ({ detail: registration }) => setRegistrationWaiting(registration.waiting)

    onAuthStateChanged(auth, user => {
      setUser(user)
      user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
    })
    window.addEventListener('serviceworkerupdate', handleRegistration)

    return () => window.removeEventListener('serviceworkerupdate', handleRegistration)
  }, [])

  useEffect(() => {
    setPrevLocation(currLocation)
    setCurrLocation(location.pathname)
  }, [location])

  const changeRoute = dir => {
    const index = routes.indexOf(currLocation)

    if (dir === 'left' && routes[index - 1]) navigate(routes[index - 1])
    if (dir === 'right' && routes[index + 1]) navigate(routes[index + 1])
  }

  const replaceSW = () => {
    registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
    registrationWaiting.addEventListener('statechange', event => {
      if (event.target.state === 'activated') window.location.reload()
    })
  }

  const transitionDirection = routes.indexOf(currLocation) > routes.indexOf(prevLocation) ? 'left' : 'right'
  const transitionOptions = mobile
    ? { key: location.key, timeout: 200, classNames: { ...style } }
    : { timeout: 0, classNames: '' }

  if (!user) return <Auth auth={auth} />

  return (
    <>
      <If condition={window.matchMedia('(display-mode: standalone)').matches && registrationWaiting}>
        <UpdateAlert onClick={replaceSW} />
      </If>

      <NavigationBar>
        <UserTooltip email={user.email} auth={auth} onLogoutRef={onLogoutRef} />
      </NavigationBar>

      <TransitionGroup className={style[transitionDirection]}>
        <CSSTransition {...transitionOptions}>
          <Suspense fallback={<></>}>
            <Main user={user} onLogoutRef={onLogoutRef} onChangeRoute={changeRoute} />
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default App
