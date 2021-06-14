import { useState, useEffect } from 'react'
import { useSetRecoilState, useResetRecoilState } from 'recoil'

import { authVisibleState } from 'atoms'
import { userSelector, notesSelector, listsSelector } from 'selectors'
import { registerService, loginService } from 'services'
import { SIGN_UP, LOG_IN } from './constants'
import { safari } from 'util/user-agent'
import { If, Backdrop } from 'components'
import { Login, Signup } from './style'

import style from './Auth.scss'

const Auth = () => {
  const setUser = useSetRecoilState(userSelector)
  const resetAuthVisible = useResetRecoilState(authVisibleState)
  const setNotes = useSetRecoilState(notesSelector)
  const setLists = useSetRecoilState(listsSelector)

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

    const localNotes = localStorage.notes ? JSON.parse(localStorage.notes) : []
    const localLists = localStorage.lists ? JSON.parse(localStorage.lists) : []

    const res = await registerService({
      ...credentials,
      notes: localNotes,
      lists: localLists
    })

    const { name, notes, lists, token, err } = await res.json()

    if (err) {
      setError(err)
      return setLoading(false)
    }

    localStorage.clear()

    if (safari) localStorage.setItem('token', token)

    setUser({ name })
    setNotes(notes)
    setLists(lists)
    resetAuthVisible()
  }

  const login = async credentials => {
    setError()
    setLoading(true)

    const res = await loginService({ ...credentials })

    const { name, notes, lists, token, err } = await res.json()

    if (err) {
      setError(err)
      return setLoading(false)
    }

    if (safari) localStorage.setItem('token', token)

    setUser({ name })
    setNotes(notes)
    setLists(lists)
    resetAuthVisible()
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
      <Backdrop onClick={resetAuthVisible} />

      <div className={style.wrapper}>
        <div className={style.title}>
          <Login action={action} onClick={actionChangedHandler}>
            {LOG_IN}
          </Login>

          <div className={style.divider} />

          <Signup action={action} onClick={actionChangedHandler}>
            {SIGN_UP}
          </Signup>
        </div>

        <form onSubmit={submitFormHandler}>
          <If condition={error}>
            <p className={style.error}>{error}</p>
          </If>

          {action === SIGN_UP ? (
            <input
              className={style.field}
              type="text"
              value={name}
              placeholder="Name"
              required
              onChange={event => setName(event.target.value)}
            />
          ) : (
            <p style={{ marginBottom: '40px', textAlign: 'center' }}>
              Login to have your notes and files saved on the cloud
            </p>
          )}

          <input
            className={style.field}
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={event => setEmail(event.target.value)}
          />

          <input
            className={style.field}
            type="password"
            value={password}
            placeholder="Password"
            minLength="8"
            required
            onChange={event => setPassword(event.target.value)}
          />

          <input className={style.submit} type="submit" value={action} disabled={loading} />
        </form>
      </div>
    </>
  )
}

export default Auth
