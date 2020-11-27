import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { createWebSocketConnection } from 'websocketConnection'
import { themeState, authIsOpenState, userState, notesState } from 'atoms'
import { REGISTER, LOGIN } from './constants'
import { Backdrop } from 'components/UI'
import { Wrapper, Title, Login, Divider, Register, ErrorMessage, LoginMessage, Input, Submit } from './style'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

const Auth = () => {
  const theme = useRecoilValue(themeState)
  const setUser = useSetRecoilState(userState)
  const setAuthIsOpen = useSetRecoilState(authIsOpenState)
  const setNotes = useSetRecoilState(notesState)

  const [action, setAction] = useState(LOGIN)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const register = async credentials => {
    // dispatch({ type: LOADING, loading: true })
    // dispatch({ type: ERROR, errorMessage: false })

    const body = JSON.stringify({
      ...credentials,
      notes: localStorage.notes
        ? JSON.parse(localStorage.notes).map(note => ({ ...note, _id: null })) // _id is removed to prevent ObjectId errors on server side
        : [],
    })

    const res = await fetch(`${REACT_APP_SERVER_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const { name, notes, err } = await res.json()

    if (err) {
      // dispatch({ type: ERROR, errorMessage: err })
      // dispatch({ type: LOADING, loading: false })
    }

    localStorage.clear()
    localStorage.setItem('name', name)

    createWebSocketConnection()

    setUser({ name })
    setNotes(notes)
    setAuthIsOpen(false)
    // dispatch({ type: LOADING, loading: false })
  }

  const login = async credentials => {
    // dispatch({ type: LOADING, loading: true })
    // dispatch({ type: ERROR, errorMessage: false })

    const body = JSON.stringify({ ...credentials })

    const res = await fetch(`${REACT_APP_SERVER_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const { name, notes, err } = await res.json()

    if (err) {
      // dispatch({ type: ERROR, errorMessage: err })
      // dispatch({ type: LOADING, loading: false })
      return
    }

    localStorage.setItem('name', name)

    createWebSocketConnection()

    setUser({ name })
    setNotes(notes)
    setAuthIsOpen(false)

    // dispatch({ type: LOADING, loading: false })
  }

  const actionChangedHandler = event => {
    setAction(event.target.innerHTML)
    setName('')
    setPassword('')
  }

  const submitFormHandler = event => {
    event.preventDefault()

    action === REGISTER
      ? register({ name: name.trim(), email, password })
      : login({ name: name.trim(), email, password })
  }

  return (
    <>
      <Backdrop onClick={() => setAuthIsOpen(false)} />

      <Wrapper theme={theme}>
        <Title>
          <Login action={action} onClick={actionChangedHandler}>
            {LOGIN}
          </Login>
          <Divider />
          <Register action={action} onClick={actionChangedHandler}>
            {REGISTER}
          </Register>
        </Title>

        <form onSubmit={submitFormHandler}>
          {/* {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} */}
          {action === REGISTER ? (
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
