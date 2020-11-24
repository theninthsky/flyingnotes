import { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRecoilValue } from 'recoil'

import { toggleAuth, updateUser, changePassword, logout } from '../../store/actions'
import { themeState } from '../App/atoms'
import { Backdrop } from '../UI'
import { Wrapper, UserLogo, Name, ErrorMessage, Input, Submit, Notes, ChangePassword } from './style'

import userLogo from '../../assets/images/user-astronaut.svg'

const User = () => {
  const dispatch = useDispatch()
  const { errorMessage, user, notes } = useSelector(
    ({ app: { errorMessage }, user, notes }) => ({ errorMessage, user, notes }),
    shallowEqual,
  )

  const theme = useRecoilValue(themeState)

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
    updateUser(event.currentTarget.textContent)
  }

  const submitFormHandler = event => {
    event.preventDefault()
    dispatch(changePassword(password, newPassword))
  }

  return (
    <>
      <Backdrop onClick={() => dispatch(toggleAuth())} />

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
            <div>
              <Notes>{`Notes: ${notes.length}`}</Notes>
            </div>

            <Submit type="submit" value="Logout" onClick={() => dispatch(logout())} />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default User
