import { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import { If, useAxios } from 'frontend-essentials'
import cx from 'clsx'

import { authVisibleState } from 'containers/App/atoms'
import { notesState } from 'containers/Notes/atoms'
import { listsState } from 'containers/Lists/atoms'
import { filesState } from 'containers/Files/atoms'
import { userSelector } from 'containers/App/selectors'
import { ws } from 'websocket-connection'
import { LOGOUT } from './constants'
import Backdrop from 'components/Backdrop'

import style from './User.scss'
import UserLogoIcon from 'images/user-astronaut.svg'

const { SERVER_URL } = process.env

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
    activate: activateChangePassword
  } = useAxios({ suspense: true, url: `${SERVER_URL}/change-password`, method: 'put' })

  const {
    loading: loadingLogout,
    error: errorLogout,
    activate: activateLogout
  } = useAxios({ suspense: true, url: `${SERVER_URL}/logout`, method: 'post' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const onChangePassword = async event => {
    event.preventDefault()

    activateChangePassword({ data: { password, newPassword }, onSuccess: resetAuthVisible })
  }

  const onLogout = () => {
    activateLogout({
      onSuccess: () => {
        localStorage.removeItem('userNotes')
        localStorage.removeItem('userLists')
        localStorage.removeItem('token')

        setNotes(JSON.parse(localStorage.notes || '[]'))
        setLists(JSON.parse(localStorage.lists || '[]'))
        resetFiles()

        ws.close()
        ws.destroy()

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
          onBlur={async () => {
            await ws.json({ type: 'updateUser', newName: name })
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
