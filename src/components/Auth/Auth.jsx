import { useState, useEffect } from 'react'
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { getAuth } from 'firebase/auth'
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { If } from 'frontend-essentials'
import cx from 'clsx'

import { authVisibleState } from 'containers/App/atoms'
import { userSelector } from 'containers/App/selectors'
import { notesSelector } from 'containers/Notes/selectors'
import { listsSelector } from 'containers/Lists/selectors'
import firebaseApp from 'firebase-app'
import { LOG_IN, SIGN_UP } from './constants'
import Backdrop from 'components/Backdrop'

import style from './Auth.scss'

const auth = getAuth(firebaseApp)

const Auth = () => {
  const setUser = useSetRecoilState(userSelector)
  const resetAuthVisible = useResetRecoilState(authVisibleState)
  const setNotes = useSetRecoilState(notesSelector)
  const setLists = useSetRecoilState(listsSelector)

  const [action, setAction] = useState(LOG_IN)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signIn, signedInUser, signingIn] = useSignInWithEmailAndPassword(auth)
  const [register, registeredUser, registering] = useCreateUserWithEmailAndPassword(auth)

  const user = signedInUser || registeredUser
  const loading = signingIn || registering

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  useEffect(() => {
    if (user) resetAuthVisible()
  }, [user])

  const actionChangedHandler = event => {
    setAction(event.target.textContent)
    setName('')
    setPassword('')
  }

  const submitFormHandler = event => {
    event.preventDefault()

    const localNotes = localStorage.notes ? JSON.parse(localStorage.notes) : []
    const localLists = localStorage.lists ? JSON.parse(localStorage.lists) : []
    const payload = {
      name: name.trim(),
      email,
      password,
      ...(action === SIGN_UP ? { notes: localNotes, lists: localLists } : {})
    }

    // if (action === LOG_IN) {
    //   return login({
    //     data: payload,
    //     onSuccess: ({ data: { name, notes, lists } }) => {
    //       setUser({ name })
    //       setNotes(notes)
    //       setLists(lists)
    //       resetAuthVisible()
    //     }
    //   })
    // }

    // register({
    //   data: payload,
    //   onSuccess: ({ data: { name, notes, lists, token } }) => {
    //     localStorage.clear()

    //     setUser({ name })
    //     setNotes(notes)
    //     setLists(lists)
    //     resetAuthVisible()
    //   }
    // })

    action === LOG_IN ? signIn(email, password) : register(email, password)
  }

  const error = undefined

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
            <p className={style.error}>{error?.response.data.err}</p>
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
