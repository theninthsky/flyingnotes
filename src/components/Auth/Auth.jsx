import { useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth'

import isMobileBrowser from './is-mobile-browser'

import style from './Auth.scss'
import googleSignInImage from 'images/google-sign-in.png'

const provider = new GoogleAuthProvider()
const mobileBrowser = isMobileBrowser()

const Auth = ({ auth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  useEffect(() => {
    setError()
  }, [email, password])

  const onSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError()

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch ({ message }) {
      const err = message.split('/')[1].slice(0, -2)

      if (err === 'user-not-found') {
        if (confirm('No such user exists, would you like to register?')) {
          await createUserWithEmailAndPassword(auth, email, password)
        } else {
          setLoading(false)
        }
      } else {
        setError(err.replace(/-/g, ' '))
        setLoading(false)
      }
    }
  }

  const onResetPassword = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please fill out a valid email address')

    sendPasswordResetEmail(auth, email)
    alert('Check your inbox for the password reset link')
  }

  const credentialsVaild = password.length > 7 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

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
            placeholder="Email"
            required
            onChange={event => setEmail(event.target.value)}
          />
          <input
            className={style.input}
            type="password"
            value={password}
            placeholder="Password"
            minLength="8"
            required
            onChange={event => setPassword(event.target.value)}
          />

          <p className={style.error}>{error}</p>

          <a className={style.resetPassword} onClick={onResetPassword}>
            Reset password
          </a>

          <input className={style.submit} type="submit" value="Sign In" disabled={!credentialsVaild || loading} />
        </form>
      </div>
    </>
  )
}

export default Auth
