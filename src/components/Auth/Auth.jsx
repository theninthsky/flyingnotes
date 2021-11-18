import { useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth'
import { useViewport } from 'frontend-essentials'

import { auth } from 'firebase-app'
import isMobileBrowser from './is-mobile-browser'

import style from './Auth.scss'
import googleSignInImage from 'images/google-sign-in.png'

const provider = new GoogleAuthProvider()
const mobileBrowser = isMobileBrowser()

const Auth = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const onSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError()

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch ({ message }) {
      const err = message.split('/')[1].slice(0, -2)
      if (err === 'user-not-found') await createUserWithEmailAndPassword(auth, email, password)
      else setError(err.replace(/-/g, ' '))
    }

    setLoading(false)
  }

  const onResetPassword = () => {
    sendPasswordResetEmail(auth, email)
    alert('Check your inbox for the password reset link')
  }

  return (
    <>
      <div className={style.wrapper}>
        <h1 className={style.title}>Flying Notes</h1>

        <img
          className={style.googleSignIn}
          src={googleSignInImage}
          onClick={() => (mobileBrowser ? signInWithRedirect(auth, provider) : signInWithPopup(auth, provider))}
        />

        <div className={style.delimiter}>
          <div className={style.divider}></div>
          <div className={style.or}>OR</div>
          <div className={style.divider}></div>
        </div>

        <form className={style.inputs} onSubmit={onSubmit}>
          <input
            className={style.input}
            type="email"
            value={email}
            required
            onChange={event => setEmail(event.target.value)}
          />
          <input
            className={style.input}
            type="password"
            value={password}
            minLength="8"
            required
            onChange={event => setPassword(event.target.value)}
          />

          <p className={style.error}>{error}</p>

          <a className={style.resetPassword} onClick={onResetPassword}>
            Reset password
          </a>

          <input className={style.submit} type="submit" value="Log In" disabled={loading} />
        </form>
      </div>
    </>
  )
}

export default Auth
