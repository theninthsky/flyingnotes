import { useState, useEffect } from 'react'
import { useResetRecoilState } from 'recoil'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { If } from 'frontend-essentials'
import cx from 'clsx'

import { auth } from 'firebase-app'
import { authVisibleState } from 'containers/App/atoms'
import { LOG_IN, SIGN_UP } from './constants'
import Backdrop from 'components/Backdrop'

import style from './Auth.scss'

const Auth = () => {
  const resetAuthVisible = useResetRecoilState(authVisibleState)

  const [action, setAction] = useState(LOG_IN)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loading = false

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const actionChangedHandler = event => {
    setAction(event.target.textContent)
    setPassword('')
  }

  const submitFormHandler = async event => {
    event.preventDefault()

    action === LOG_IN
      ? await signInWithEmailAndPassword(auth, email, password)
      : await createUserWithEmailAndPassword(auth, email, password)

    resetAuthVisible()
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

          <If condition={action === SIGN_UP}>
            <p className={style.description}>Login to have your notes and files saved on the cloud</p>
          </If>

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
