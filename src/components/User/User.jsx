import { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import { If, useAxios } from 'frontend-essentials'
import cx from 'clsx'

import { authVisibleState } from 'containers/App/atoms'
import { notesState } from 'containers/Notes/atoms'
import { listsState } from 'containers/Lists/atoms'
import { filesState } from 'containers/Files/atoms'
import { userSelector } from 'containers/App/selectors'
import { LOGOUT } from './constants'
import Backdrop from 'components/Backdrop'

import style from './User.scss'
import UserLogoIcon from 'images/user-astronaut.svg'

const User = () => {
  const [user, setUser] = useRecoilState(userSelector)
  const resetAuthVisible = useResetRecoilState(authVisibleState)
  const setNotes = useSetRecoilState(notesState)
  const setLists = useSetRecoilState(listsState)
  const resetFiles = useResetRecoilState(filesState)

  const [name, setName] = useState(user.name)
  const [password, setPassword] = useState('')
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState()

  const {
    loading: loadingChangePassword,
    error: errorChangePassword,
    activate: changePassword
  } = useAxios({ url: '/change-password', method: 'put', manual: true })

  const { activate: updateUser } = useAxios({ url: '/user', method: 'put', manual: true })

  const {
    loading: loadingLogout,
    error: errorLogout,
    activate: logout
  } = useAxios({ url: '/logout', method: 'post', manual: true })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const onChangePassword = async event => {
    event.preventDefault()

    changePassword({ data: { password, newPassword }, onSuccess: resetAuthVisible })
  }

  const onLogout = () => {
    logout({
      onSuccess: () => {
        localStorage.removeItem('userNotes')
        localStorage.removeItem('userLists')
        localStorage.removeItem('token')

        setNotes(JSON.parse(localStorage.notes || '[]'))
        setLists(JSON.parse(localStorage.lists || '[]'))
        resetFiles()

        setTimeout(() => {
          setUser({ name: null })
          resetAuthVisible()
        })
      }
    })
  }

  const loading = loadingChangePassword || loadingLogout

  return (
    <>
      <Backdrop onClick={resetAuthVisible} />

      <div className={style.wrapper}>
        <UserLogoIcon className={style.userLogo} />

        <input
          className={style.name}
          value={name}
          onChange={event => setName(event.target.value)}
          onBlur={() => {
            updateUser({ data: { name } })
            setUser({ name })
          }}
        />

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
