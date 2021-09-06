import { useState, useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useSwipeable } from 'react-swipeable'
import { Helmet } from 'react-helmet'
import { If, useViewport } from '@theninthsky/react'

import { authVisibleState } from './atoms'
import { userLoggedInSelector } from './selectors'
import { UPDATE_MESSAGE } from './constants'
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
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const authVisible = useRecoilValue(authVisibleState)

  const [registrationWaiting, setRegistrationWaiting] = useState()
  const [prevLocation, setPrevLocation] = useState()
  const [currLocation, setCurrLocation] = useState()

  const history = useHistory()
  const location = useLocation()
  const { mobile } = useViewport({ mobile: '(max-width: 991px)' })
  const handlers = useSwipeable({
    onSwipedLeft: () => changeRoute('right'),
    onSwipedRight: () => changeRoute('left'),
    preventDefaultTouchmoveEvent: true,
    delta: 80
  })

  useEffect(() => {
    const handleRegistration = ({ detail: registration }) => setRegistrationWaiting(registration.waiting)

    window.addEventListener('serviceworkerupdate', handleRegistration)

    return () => window.removeEventListener('serviceworkerupdate', handleRegistration)
  }, [])

  useEffect(() => {
    setPrevLocation(currLocation)
    setCurrLocation(location.pathname)
  }, [location])

  const changeRoute = dir => {
    const index = routes.indexOf(currLocation)

    if (dir === 'left' && routes[index - 1]) history.push(routes[index - 1])
    if (dir === 'right' && routes[index + 1]) history.push(routes[index + 1])
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
        <UpdateAlert onClick={replaceSW}>{UPDATE_MESSAGE}</UpdateAlert>
      </If>

      <NavigationBar />

      <If condition={authVisible}>{userLoggedIn ? <User /> : <Auth />}</If>

      <TransitionGroup className={style[transitionDirection]}>
        <CSSTransition {...transitionOptions}>
          <Switch location={location}>
            <Route exact path="/">
              <div className={style.page} {...handlers}>
                <Helmet>
                  <title>My Notes</title>
                </Helmet>

                <Notes />
              </div>
            </Route>

            <Route path="/lists">
              <div className={style.page} {...handlers}>
                <Helmet>
                  <title>My Lists</title>
                </Helmet>

                <Lists />
              </div>
            </Route>

            <Route path="/files">
              <div className={style.page} {...handlers}>
                <Helmet>
                  <title>My Files</title>
                </Helmet>

                <Suspense fallback={<></>}>
                  <Files />
                </Suspense>
              </div>
            </Route>

            <Redirect to="/" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default App
