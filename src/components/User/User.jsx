import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { toggleAuth, updateUser, changePassword, logout } from '../../store/actions'
import { Backdrop } from '../UI'

import userLogo from '../../assets/images/user-astronaut.svg'

// #region Styles
const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 40vw;
  height: 60vh;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 2px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  background-color: ${({ theme }) => (theme === 'dark' ? '#222' : 'white')};
  animation: showUser 0.5s;

  @keyframes showUser {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 90vw;
  }
`
const UserLogo = styled.img`
  margin: 10px auto;
  width: 20%;
  border-radius: 100%;
  filter: ${({ theme }) => (theme === 'dark' ? 'invert(100%)' : 'none')};
`
const Name = styled.h1`
  align-self: center;
  padding-left: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 20px;
  font-weight: normal;
`
const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`
const Input = styled.input`
  display: block;
  margin: 1vh auto;
  padding: 4px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
  font-size: 16px;

  &:-webkit-autofill {
    box-shadow: 0 0 0 100px white inset;
  }
`
const Submit = styled(Input)`
  margin-top: 10%;
  padding: 6px;
  border: 1px solid gray;
  border-width: 1px;
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: white;
    background-color: gray;
  }
`
const Notes = styled.h1`
  margin: 6px;
  padding-left: 10%;
  font-size: 20px;
  font-weight: normal;
`
const ChangePassword = styled.button`
  display: block;
  margin: 0 auto;
  border: none;
  color: inherit;
  font-size: 14px;
  background-color: transparent;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`
// #endregion

const User = () => {
  const dispatch = useDispatch()
  const { theme, errorMessage, user, notes } = useSelector(
    ({ app: { theme, errorMessage }, user, notes }) => ({ theme, errorMessage, user, notes }),
    shallowEqual,
  )

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
