import { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Helmet } from 'react-helmet'

import { authVisibleState } from 'atoms'
import { userLoggedInSelector } from 'selectors'
import { UPDATE_MESSAGE } from './constants'
import { Notes, Lists, Files } from 'containers'
import { If, NavigationBar, Auth, User, UpdateAlert } from 'components'

import style from './App.scss'

document.documentElement.setAttribute('data-theme', localStorage.theme || 'dark')

const App = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const authVisible = useRecoilValue(authVisibleState)

  const [registrationWaiting, setRegistrationWaiting] = useState()

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

      <Switch>
        <Route exact path="/">
          <Helmet>
            <title>My Notes</title>
          </Helmet>
          <h1 className={style.heading}>Notes</h1>
          <Notes />
        </Route>

        <Route path="/lists">
          <Helmet>
            <title>My Lists</title>
          </Helmet>
          <h1 className={style.heading}>Lists</h1>
          <Lists />
        </Route>

        <Route path="/files">
          <Helmet>
            <title>My Files</title>
          </Helmet>
          <h1 className={style.heading}>Files</h1>
          <Files />
        </Route>

        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App
