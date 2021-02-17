import { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Helmet } from 'react-helmet'
import 'normalize.css'

import { authIsVisibleState, userState } from 'atoms'
import { UPDATE_MESSAGE } from './constants'
import { If, NavigationBar, Auth, User, Notes, Lists, Files, UpdateAlert } from 'components'
import { GlobalStyle, Heading } from './style'

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
      <GlobalStyle />

      <If condition={window.matchMedia('(display-mode: standalone)').matches && registrationWaiting}>
        <UpdateAlert onClick={replaceSW}>{UPDATE_MESSAGE}</UpdateAlert>
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

        <Route exact path="/lists">
          <Helmet>
            <title>My Lists</title>
          </Helmet>
          <Heading>Lists</Heading>
          <Lists />
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
