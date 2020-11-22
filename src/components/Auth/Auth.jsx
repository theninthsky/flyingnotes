import { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import * as actions from '../../store/actions'
import { Backdrop } from '../UI'
import { Wrapper, Title, Login, Divider, Register, ErrorMessage, LoginMessage, Input, Submit } from './style'

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
