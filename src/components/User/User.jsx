import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocketConnection'
import { themeState, authIsOpenState, userState, errorMessageState, notesState } from 'atoms'
import { Backdrop } from 'components/UI'
import { Wrapper, UserLogo, Name, ErrorMessage, Input, Submit, ChangePassword } from './style'

import userLogo from 'assets/images/user-astronaut.svg'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

const User = () => {
  const theme = useRecoilValue(themeState)
  const [user, setUser] = useRecoilState(userState)
  const setAuthIsOpen = useSetRecoilState(authIsOpenState)
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState)
  const setNotes = useSetRecoilState(notesState)

  const [name, setName] = useState(user.name)
  const [password, setPassword] = useState('')
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const changePassword = async event => {
    event.preventDefault()

    // dispatch({ type: LOADING, loading: true })
    // dispatch({ type: ERROR, errorMessage: false })

    const { status } = await ws.json({ type: 'changePassword', password, newPassword })

    if (status === 'SUCCESS') {
      /*dispatch({ type: LOADING, loading: false })*/
      setAuthIsOpen(false)
    }
  }

  const logout = async () => {
    try {
      await fetch(`${REACT_APP_SERVER_URL}/logout`, { method: 'POST' })

      localStorage.removeItem('name')

      setUser({ name: null })
      setNotes(JSON.parse(localStorage.notes || '[]'))

      ws.close()
    } catch (err) {
      return setErrorMessage('Failed to logout')
    }

    setAuthIsOpen(false)
  }

  return (
    <>
      <Backdrop onClick={() => setAuthIsOpen(false)} />

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

        {changePasswordMode || errorMessage ? (
          <form onSubmit={changePassword}>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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

            <Submit type="submit" />
          </form>
        ) : (
          <>
            <ChangePassword onClick={() => setChangePasswordMode(true)}>Change Password</ChangePassword>

            <Submit type="submit" value="Logout" onClick={logout} />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default User
