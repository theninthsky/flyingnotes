import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { authVisibleState, notesState, listsState, filesState } from 'atoms'
import { userSelector } from 'selectors'
import { changePasswordService, logoutService } from 'services'
import { EMPTY_IMAGE } from 'global-constants'
import { LOGOUT } from './constants'
import { If, Backdrop } from 'components'
import { Wrapper, UserLogo, Name, Input, Submit, ChangePassword } from './style'

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

      <Wrapper>
        <UserLogo src={EMPTY_IMAGE} alt="User" />

        <Name
          value={name}
          onChange={event => setName(event.target.value)}
          onBlur={async () => {
            await ws.json({ type: 'updateUser', newName: name })
            setUser({ name })
          }}
        />

        <If condition={error}>
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        </If>

        {changePasswordMode ? (
          <form onSubmit={changePassword}>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              minLength="8"
              required
              onChange={event => setPassword(event.target.value)}
            />

            <Input
              type="password"
              value={newPassword}
              placeholder="New Password"
              minLength="8"
              onChange={event => setNewPassword(event.target.value)}
            />

            <Submit type="submit" disabled={loading} />
          </form>
        ) : (
          <>
            <ChangePassword onClick={() => setChangePasswordMode(true)}>Change Password</ChangePassword>

            <Submit type="submit" value={LOGOUT} disabled={loading} onClick={logout} />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default User
