import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import app from 'firebase-app'
import NavigationBar from 'components/NavigationBar'
import Auth from 'components/Auth'
import UserTooltip from 'components/UserTooltip'
import Main from 'containers/Main'

const auth = getAuth(app)

document.documentElement.setAttribute('data-theme', localStorage.theme || 'light')

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.user || null))

  const onLogoutRef = useRef(() => {})

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
      user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
    })
  }, [])

  if (!user) return <Auth auth={auth} />

  return (
    <>
      <NavigationBar>
        <UserTooltip email={user.email} auth={auth} onLogoutRef={onLogoutRef} />
      </NavigationBar>

      <Main user={user} onLogoutRef={onLogoutRef} />
    </>
  )
}

export default App
