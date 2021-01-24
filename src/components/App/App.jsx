import { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Helmet } from 'react-helmet'
import 'normalize.css'

import { authIsVisibleState, userState } from 'atoms'
import { UPDATE_MESSAGE } from './constants'
import If from 'components/If'
import NavigationBar from 'components/NavigationBar'
import Auth from 'components/Auth'
import User from 'components/User'
import Notes from 'components/Notes'
import Files from 'components/Files'
import Alert from 'components/Alert'
import { GlobalStyle, Heading } from './style'
import 'util/preload-images'

document.documentElement.setAttribute('data-theme', localStorage.theme || 'dark')

const App = () => {
  const user = useRecoilValue(userState)
  const authIsVisible = useRecoilValue(authIsVisibleState)

  const history = useHistory()

  const [registrationWaiting, setRegistrationWaiting] = useState()

  useEffect(() => {
    if (!user.name) history.replace('/')
  }, [user.name, history])

  useEffect(() => {
    const handleRegistration = ({ detail: registration }) => setRegistrationWaiting(registration.waiting)

    window.addEventListener('sw_update', handleRegistration)

    return () => window.removeEventListener('sw_update', handleRegistration)
  }, [registrationWaiting])

  const replaceSW = () => {
    if (!registrationWaiting) return

    registrationWaiting.postMessage({ type: 'SKIP_WAITING' })

    registrationWaiting.addEventListener('statechange', event => {
      if (event.target.state === 'activated') window.location.reload()
    })
  }

  return (
    <>
      <GlobalStyle />

      <If condition={window.matchMedia('(display-mode: standalone)').matches && registrationWaiting}>
        <Alert onClick={replaceSW}>{UPDATE_MESSAGE}</Alert>
      </If>

      <NavigationBar />

      <If condition={authIsVisible}>{!user.name ? <Auth /> : <User />}</If>

      <Switch>
        <Route exact path="/">
          <Helmet>
            <title>My Notes</title>
          </Helmet>
          <Heading>Notes</Heading>
          <Notes />
        </Route>

        <Route path="/files">
          <Helmet>
            <title>My Files</title>
          </Helmet>
          <Heading>Files</Heading>
          <Files />
        </Route>
      </Switch>
    </>
  )
}

export default App
