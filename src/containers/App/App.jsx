import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { If } from 'frontend-essentials'

import app from 'firebase-app'
import NavigationBar from 'components/NavigationBar'
import Auth from 'components/Auth'
import UpdateAlert from 'components/UpdateAlert'
import UserTooltip from 'components/UserTooltip'

const Main = lazy(() => import('containers/Main'))

const auth = getAuth(app)

document.documentElement.setAttribute('data-theme', localStorage.theme || 'light')

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.user || null))
  const [registrationWaiting, setRegistrationWaiting] = useState()

  const onLogoutRef = useRef(() => {})

  useEffect(() => {
    const handleRegistration = ({ detail: registration }) => setRegistrationWaiting(registration.waiting)

    onAuthStateChanged(auth, user => {
      setUser(user)
      user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
    })
    window.addEventListener('serviceworkerupdate', handleRegistration)

    return () => window.removeEventListener('serviceworkerupdate', handleRegistration)
  }, [])

  const replaceSW = () => {
    registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
    registrationWaiting.addEventListener('statechange', event => {
      if (event.target.state === 'activated') window.location.reload()
    })
  }

  if (!user) return <Auth auth={auth} />

  return (
    <>
      <If condition={window.matchMedia('(display-mode: standalone)').matches && registrationWaiting}>
        <UpdateAlert onClick={replaceSW} />
      </If>

      <NavigationBar>
        <UserTooltip email={user.email} auth={auth} onLogoutRef={onLogoutRef} />
      </NavigationBar>

      <Suspense fallback={<></>}>
        <Main user={user} onLogoutRef={onLogoutRef} />
      </Suspense>
    </>
  )
}

export default App
