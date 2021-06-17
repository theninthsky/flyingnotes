import { useState, useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Helmet } from 'react-helmet'

import { authVisibleState } from './atoms'
import { userLoggedInSelector } from './selectors'
import { UPDATE_MESSAGE } from './constants'
import useViewport from 'hooks/useViewport'
import Notes from 'containers/Notes'
import If from 'components/If'
import NavigationBar from 'components/NavigationBar'
import Auth from 'components/Auth'
import User from 'components/User'
import UpdateAlert from 'components/UpdateAlert'

import style from './App.scss'

const Lists = lazy(() => import(/* webpackPrefetch: true */ 'containers/Lists'))
const Files = lazy(() => import(/* webpackPrefetch: true */ 'containers/Files'))

document.documentElement.setAttribute('data-theme', localStorage.theme || 'dark')

const App = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const authVisible = useRecoilValue(authVisibleState)

  const [registrationWaiting, setRegistrationWaiting] = useState()

  const location = useLocation()
  const { mobile } = useViewport({ mobile: '(max-width: 991px)' })

  useEffect(() => {
    const handleRegistration = ({ detail: registration }) => setRegistrationWaiting(registration.waiting)

    window.addEventListener('serviceworkerupdate', handleRegistration)

    return () => window.removeEventListener('serviceworkerupdate', handleRegistration)
  }, [])

  const replaceSW = () => {
    if (!registrationWaiting) return

    registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
    registrationWaiting.addEventListener('statechange', event => {
      if (event.target.state === 'activated') window.location.reload()
    })
  }

  return (
    <>
      <If condition={window.matchMedia('(display-mode: standalone)').matches && registrationWaiting}>
        <UpdateAlert onClick={replaceSW}>{UPDATE_MESSAGE}</UpdateAlert>
      </If>

      <NavigationBar />

      <If condition={authVisible}>{userLoggedIn ? <User /> : <Auth />}</If>

      <TransitionGroup>
        <CSSTransition
          key={mobile ? location.key : undefined}
          timeout={mobile ? 200 : 0}
          classNames={mobile ? { ...style } : {}}
        >
          <Switch location={location}>
            <Route exact path="/">
              <div className={style.page}>
                <Helmet>
                  <title>My Notes</title>
                </Helmet>
                <h1 className={style.heading}>Notes</h1>
                <Notes />
              </div>
            </Route>

            <Route path="/lists">
              <div className={style.page}>
                <Helmet>
                  <title>My Lists</title>
                </Helmet>
                <h1 className={style.heading}>Lists</h1>
                <Suspense fallback={() => {}}>
                  <Lists />
                </Suspense>
              </div>
            </Route>

            <Route path="/files">
              <div className={style.page}>
                <Helmet>
                  <title>My Files</title>
                </Helmet>
                <h1 className={style.heading}>Files</h1>
                <Suspense fallback={() => {}}>
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
