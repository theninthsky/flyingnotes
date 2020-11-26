import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocketConnection'
import { changePassword } from 'store/actions'
import { themeState, authIsOpenState, userState, errorMessageState } from 'atoms'
import { Backdrop } from 'components/UI'
import { Wrapper, UserLogo, Name, ErrorMessage, Input, Submit, ChangePassword } from './style'

import userLogo from 'assets/images/user-astronaut.svg'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

const User = () => {
  const dispatch = useDispatch()

  const theme = useRecoilValue(themeState)
  const [user, setUser] = useRecoilState(userState)
  const setAuthIsOpen = useSetRecoilState(authIsOpenState)
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState)

  const [name, setName] = useState(user.name)
  const [password, setPassword] = useState('')
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const nameHanlder = event => {
    setName(event.currentTarget.textContent)
    ws.json({ type: 'updateUser', newName: event.currentTarget.textContent })
  }

  const submitFormHandler = event => {
    event.preventDefault()
    dispatch(changePassword(password, newPassword))
  }

  const logout = async () => {
    try {
      await fetch(`${REACT_APP_SERVER_URL}/logout`, { method: 'POST' })

      localStorage.removeItem('name')
      ws.close()

      setUser({ name: null })
      // dispatch({ type: SET_NOTES, notes: JSON.parse(localStorage.notes || '[]') })
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

        <Name contentEditable suppressContentEditableWarning={true} spellCheck="false" onBlur={nameHanlder}>
          {name}
        </Name>

        {changePasswordMode || errorMessage ? (
          <form onSubmit={submitFormHandler}>
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
