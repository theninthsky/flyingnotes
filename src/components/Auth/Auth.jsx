import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { authIsVisibleState, userState, notesState } from 'atoms'
import { SIGN_UP, LOG_IN } from './constants'
import If from 'components/If'
import { Backdrop } from 'components/UI'
import { Wrapper, Title, Login, Divider, Register, ErrorMessage, LoginMessage, Input, Submit } from './style'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

const Auth = () => {
  const setUser = useSetRecoilState(userState)
  const setAuthIsVisible = useSetRecoilState(authIsVisibleState)
  const setNotes = useSetRecoilState(notesState)

  const [action, setAction] = useState(LOG_IN)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const register = async credentials => {
    setError()
    setLoading(true)

    const body = JSON.stringify({
      ...credentials,
      notes: localStorage.notes
        ? JSON.parse(localStorage.notes).map(note => ({ ...note, _id: null })) // _id is removed to prevent ObjectId errors on server side
        : []
    })

    const res = await fetch(`${REACT_APP_SERVER_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body
    })

    const { name, notes, err } = await res.json()

    if (err) {
      setError(err)
      return setLoading(false)
    }

    localStorage.clear()
    localStorage.setItem('name', name)

    setUser({ name })
    setNotes(notes)
    setAuthIsVisible(false)
  }

  const login = async credentials => {
    setError()
    setLoading(true)

    const body = JSON.stringify({ ...credentials })

    const res = await fetch(`${REACT_APP_SERVER_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body
    })

    const { name, notes, err } = await res.json()

    if (err) {
      setError(err)
      return setLoading(false)
    }

    localStorage.setItem('user', name)
    localStorage.userNotes = JSON.stringify(notes)

    setUser({ name })
    setNotes(notes)
    setAuthIsVisible(false)
  }

  const actionChangedHandler = event => {
    setAction(event.target.innerHTML)
    setName('')
    setPassword('')
  }

  const submitFormHandler = event => {
    event.preventDefault()

    action === SIGN_UP
      ? register({ name: name.trim(), email, password })
      : login({ name: name.trim(), email, password })
  }

  return (
    <>
      <Backdrop onClick={() => setAuthIsVisible(false)} />

      <Wrapper>
        <Title>
          <Login action={action} onClick={actionChangedHandler}>
            {LOG_IN}
          </Login>

          <Divider />

          <Register action={action} onClick={actionChangedHandler}>
            {SIGN_UP}
          </Register>
        </Title>

        <form onSubmit={submitFormHandler}>
          <If condition={error}>
            <ErrorMessage>{error}</ErrorMessage>
          </If>

          {action === SIGN_UP ? (
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

          <Submit type="submit" value={action} disabled={loading} />
        </form>
      </Wrapper>
    </>
  )
}

export default Auth
