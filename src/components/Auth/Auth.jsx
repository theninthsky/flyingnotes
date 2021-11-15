import { useEffect } from 'react'
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { useViewport } from 'frontend-essentials'

import { auth } from 'firebase-app'
import isMobileBrowser from './is-mobile-browser'
import Backdrop from 'components/Backdrop'

import style from './Auth.scss'
import GoogleIcon from 'images/google.svg'

const provider = new GoogleAuthProvider()
const mobileBrowser = isMobileBrowser()

const Auth = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = 'visible')
  }, [])

  return (
    <>
      <Backdrop />

      <div className={style.wrapper}>
        <button
          className={style.signIn}
          onClick={() => (mobileBrowser ? signInWithRedirect(auth, provider) : signInWithPopup(auth, provider))}
        >
          <GoogleIcon />
          <span className={style.signInText}>Sign in with Google</span>
        </button>
      </div>
    </>
  )
}

export default Auth
