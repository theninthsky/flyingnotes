import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import * as actions from '../../store/actions'
import { Backdrop } from '../UI'

// #region Styles
const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 30vw;
  height: 50vh;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 2px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  background-color: ${({ theme }) => (theme === 'dark' ? '#222' : 'white')};
  animation: showAuth 0.5s;

  @keyframes showAuth {
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
const Title = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: center;

  h1 {
    font-weight: normal;
    cursor: pointer;
  }
`
const Login = styled.h1`
  opacity: ${({ action }) => (action === 'Login' ? '1' : '0.4')};

  &:hover {
    opacity: 1;
  }
`
const Divider = styled.div`
  margin-top: 5%;
  height: 50px;
  border: 0.5px solid rgb(128, 128, 128);
`
const Register = styled.h1`
  opacity: ${({ action }) => (action === 'Register' ? '1' : '0.4')};

  &:hover {
    opacity: 1;
  }
`
const ErrorMessage = styled.p`
  margin-bottom: 10%;
  text-align: center;
  color: red;
`
const LoginMessage = styled.p`
  margin-bottom: 10%;
  text-align: center;
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
    -webkit-box-shadow: 0 0 0 100px white inset;
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
// #endregion

const Auth = () => {
  const dispatch = useDispatch()
  const { theme, errorMessage, user } = useSelector(
    ({ app: { theme, errorMessage }, user }) => ({
      theme,
      errorMessage,
      user,
    }),
    shallowEqual,
  )

  const [action, setAction] = useState('Login')
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const actionChangedHandler = event => {
    setAction(event.target.innerHTML)
    setName('')
    setPassword('')
  }

  const submitFormHandler = event => {
    event.preventDefault()
    dispatch(actions[action.toLowerCase()]({ name: name.trim(), email, password }))
  }

  return (
    <>
      <Backdrop onClick={() => dispatch(actions.toggleAuth())} />

      <Wrapper theme={theme}>
        <Title>
          <Login action={action} onClick={actionChangedHandler}>
            Login
          </Login>
          <Divider />
          <Register action={action} onClick={actionChangedHandler}>
            Register
          </Register>
        </Title>

        <form onSubmit={submitFormHandler}>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {action === 'Register' ? (
            <Input
              type="text"
              value={name}
              placeholder="Name"
              required
              onChange={event => setName(event.target.value)}
            />
          ) : (
            <LoginMessage>Login to have your notes and files saved on the cloud</LoginMessage>
          )}
          <Input
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={event => setEmail(event.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            minLength="8"
            required
            onChange={event => setPassword(event.target.value)}
          />
          <Submit type="submit" value={action} />
        </form>
      </Wrapper>
    </>
  )
}

export default Auth
