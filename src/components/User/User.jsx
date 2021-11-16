import { useEffect } from 'react'
import { signOut } from 'firebase/auth'

import { auth } from 'firebase-app'
import Backdrop from 'components/Backdrop'

import style from './User.scss'
import UserLogoIcon from 'images/user-astronaut.svg'

const LOGOUT = 'Logout'

const User = ({ user, cleanupUser, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const onLogout = async () => {
    cleanupUser()
    await signOut(auth)
    onClose()
  }

  return (
    <>
      <Backdrop onClick={onClose} />

      <div className={style.wrapper}>
        <UserLogoIcon className={style.userLogo} />

        <div className={style.email}>{user.email}</div>

        <input className={style.logout} type="submit" value={LOGOUT} onClick={onLogout} />
      </div>
    </>
  )
}

export default User
