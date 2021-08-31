import { useState, useEffect } from 'react'
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import cx from 'clsx'

import { authVisibleState } from 'containers/App/atoms'
import { userSelector } from 'containers/App/selectors'
import { notesSelector } from 'containers/Notes/selectors'
import { listsSelector } from 'containers/Lists/selectors'
import { useAxios } from 'hooks'
import { LOG_IN, SIGN_UP } from './constants'
import { safari } from 'util/user-agent'
import If from 'components/If'
import Backdrop from 'components/Backdrop'

import style from './Auth.scss'

const { SERVER_URL } = process.env

const Auth = () => {
  const setUser = useSetRecoilState(userSelector)
  const resetAuthVisible = useResetRecoilState(authVisibleState)
  const setNotes = useSetRecoilState(notesSelector)
  const setLists = useSetRecoilState(listsSelector)

  const [action, setAction] = useState(LOG_IN)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, error, data, activate } = useAxios({
    suspense: true,
    method: 'post'
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  useEffect(() => {
    if (error || !data) return

    const { name, notes, lists, token } = data

    if (action === SIGN_UP) localStorage.clear()
    if (safari) localStorage.setItem('token', token)

    setUser({ name })
    setNotes(notes)
    setLists(lists)
    resetAuthVisible()
  }, [error, data])

  const actionChangedHandler = event => {
    setAction(event.target.textContent)
    setName('')
    setPassword('')
  }

  const submitFormHandler = event => {
    event.preventDefault()

    const url = action === LOG_IN ? `${SERVER_URL}/login` : `${SERVER_URL}/register`
    const localNotes = localStorage.notes ? JSON.parse(localStorage.notes) : []
    const localLists = localStorage.lists ? JSON.parse(localStorage.lists) : []
    const data = {
      name: name.trim(),
      email,
      password,
      ...(action === SIGN_UP ? { notes: localNotes, lists: localLists } : {})
    }

    activate({ url, data })
  }

  return (
    <>
      <Backdrop onClick={resetAuthVisible} />

      <div className={style.wrapper}>
        <div className={style.title}>
          <h2 className={cx(style.action, { [style.selected]: action === LOG_IN })} onClick={actionChangedHandler}>
            {LOG_IN}
          </h2>

          <div className={style.divider} />

          <h2 className={cx(style.action, { [style.selected]: action === SIGN_UP })} onClick={actionChangedHandler}>
            {SIGN_UP}
          </h2>
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
            <p className={style.description}>Login to have your notes and files saved on the cloud</p>
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
