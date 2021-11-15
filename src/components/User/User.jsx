import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { If, useAxios } from 'frontend-essentials'
import cx from 'clsx'

import { auth } from 'firebase-app'
import { LOGOUT } from './constants'
import Backdrop from 'components/Backdrop'

import style from './User.scss'
import UserLogoIcon from 'images/user-astronaut.svg'

const User = ({ user, onClose }) => {
  const [password, setPassword] = useState('')
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState()

  const {
    loading: loadingChangePassword,
    error: errorChangePassword,
    activate: changePassword
  } = useAxios({ url: '/change-password', method: 'put', manual: true })

  const { loading: loadingLogout, error: errorLogout } = useAxios({ url: '/logout', method: 'post', manual: true })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const onChangePassword = async event => {
    event.preventDefault()

    changePassword({ data: { password, newPassword }, onSuccess: onClose })
  }

  const onLogout = async () => {
    await signOut(auth)
    onClose()
  }

  const loading = loadingChangePassword || loadingLogout

  return (
    <>
      <Backdrop onClick={onClose} />

      <div className={style.wrapper}>
        <UserLogoIcon className={style.userLogo} />

        <div className={style.name}>{user.email}</div>

        <If condition={errorLogout || errorChangePassword}>
          <p className={cx('text-align-center', 'red')}>{errorLogout ? 'Failed to logout' : 'Incorrect password'}</p>
        </If>

        {changePasswordMode ? (
          <form onSubmit={onChangePassword}>
            <input
              className={style.field}
              type="password"
              value={password}
              placeholder="Password"
              minLength="8"
              required
              onChange={event => setPassword(event.target.value)}
            />

            <input
              className={style.field}
              type="password"
              value={newPassword}
              placeholder="New Password"
              minLength="8"
              onChange={event => setNewPassword(event.target.value)}
            />

            <input className={style.submit} type="submit" disabled={loading} />
          </form>
        ) : (
          <>
            <button className={style.changePassword} onClick={() => setChangePasswordMode(true)}>
              Change Password
            </button>

            <input className={style.submit} type="submit" value={LOGOUT} disabled={loading} onClick={onLogout} />
          </>
        )}
      </div>
    </>
  )
}

export default User
