import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { themeState, authIsVisibleState, userState, notesState } from 'atoms'
import If from 'components/If'
import { Backdrop } from 'components/UI'
import { Wrapper, UserLogo, Name, ErrorMessage, Input, Submit, ChangePassword } from './style'

import userLogo from 'assets/images/user-astronaut.svg'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

const User = () => {
  const theme = useRecoilValue(themeState)
  const [user, setUser] = useRecoilState(userState)
  const setAuthIsVisible = useSetRecoilState(authIsVisibleState)
  const setNotes = useSetRecoilState(notesState)

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

    const { status, error } = await ws.json({ type: 'changePassword', password, newPassword })

    if (status === 'SUCCESS') return setAuthIsVisible(false)

    setError(error)
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)

    try {
      await fetch(`${REACT_APP_SERVER_URL}/logout`, { method: 'POST' })

      localStorage.removeItem('name')

      setUser({ name: null })
      setNotes(JSON.parse(localStorage.notes || '[]'))
      setAuthIsVisible(false)

      ws.close()
    } catch (err) {
      setError('Failed to logout')
      setLoading(false)
    }
  }

  return (
    <>
      <Backdrop onClick={() => setAuthIsVisible(false)} />

      <Wrapper theme={theme}>
        <UserLogo theme={theme} src={userLogo} alt="User" />

        <Name
          value={name}
          onChange={event => setName(event.target.value)}
          onBlur={async () => {
            await ws.json({ type: 'updateUser', newName: name })
            setUser({ name })
          }}
        />

        <If condition={error}>
          <ErrorMessage>{error}</ErrorMessage>
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

            <Submit type="submit" value="Logout" disabled={loading} onClick={logout} />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default User
