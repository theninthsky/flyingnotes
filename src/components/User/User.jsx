import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import cx from 'clsx'

import { ws } from 'websocket-connection'
import { authVisibleState } from 'containers/App/atoms'
import { notesState } from 'containers/Notes/atoms'
import { listsState } from 'containers/Lists/atoms'
import { filesState } from 'containers/Files/atoms'

import { userSelector } from 'containers/App/selectors'
import { changePasswordService, logoutService } from 'services'
import { LOGOUT } from './constants'
import If from 'components/If'
import Backdrop from 'components/Backdrop'

import style from './User.scss'
import UserLogoIcon from 'images/user-astronaut.svg'

const User = () => {
  const history = useHistory()

  const [user, setUser] = useRecoilState(userSelector)
  const resetAuthVisible = useResetRecoilState(authVisibleState)
  const setNotes = useSetRecoilState(notesState)
  const setLists = useSetRecoilState(listsState)
  const resetFiles = useResetRecoilState(filesState)

  const [name, setName] = useState(user.name)
  const [password, setPassword] = useState('')
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const changePassword = async event => {
    event.preventDefault()

    setError()
    setLoading(true)

    const res = await changePasswordService({ password, newPassword })

    if (res.ok) return resetAuthVisible()

    const { error } = await res.json()

    setError(error)
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)

    try {
      await logoutService()

      localStorage.removeItem('userNotes')
      localStorage.removeItem('userLists')
      localStorage.removeItem('token')

      setUser({ name: null })
      setNotes(JSON.parse(localStorage.notes || '[]'))
      setLists(JSON.parse(localStorage.lists || '[]'))
      resetFiles()
      resetAuthVisible()

      ws.close()
      ws.destroy()

      history.push('/')
    } catch (err) {
      setError('Failed to logout')
      setLoading(false)
    }
  }

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

        <If condition={error}>
          <p className={cx('text-align-center', 'red')}>{error}</p>
        </If>

        {changePasswordMode ? (
          <form onSubmit={changePassword}>
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

            <input className={style.submit} type="submit" value={LOGOUT} disabled={loading} onClick={logout} />
          </>
        )}
      </div>
    </>
  )
}

export default User
