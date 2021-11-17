import { useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  const onSubmit = async event => {
    event.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      await createUserWithEmailAndPassword(auth, email, password)
    }
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
          <input className={style.input} type="email" value={email} onChange={event => setEmail(event.target.value)} />
          <input
            className={style.input}
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <input className={style.submit} type="submit" value="Log In" />
        </form>
      </div>
    </>
  )
}

export default Auth
