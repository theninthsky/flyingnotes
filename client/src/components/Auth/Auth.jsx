import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import styles from './Auth.module.scss'

const Auth = props => {
  const { theme, errorMessage } = props.app
  const { onFormSubmit } = props

  const [action, setAction] = useState('Login')
  const [name, setName] = useState(props.user.name || '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (props.user.name) {
      history.push('/account')
    }
  }, [props.user.name, history])

  const actionChangedHandler = event => {
    setAction(event.target.innerHTML)
    setName('')
    setPassword('')
  }

  const nameHanlder = event => setName(event.target.value)

  const emailHanlder = event => setEmail(event.target.value)

  const passwordHanlder = event => setPassword(event.target.value)

  const submitFormHandler = async event => {
    event.preventDefault()
    onFormSubmit({ name: name.trim(), email, password }, action.toLowerCase())
  }

  return (
    <div
      className={`${styles.auth} ${theme === 'dark' ? styles.authDark : ''}`}
    >
      <div className={styles.title}>
        <h1
          className={action === 'Login' ? null : styles.notActive}
          onClick={actionChangedHandler}
        >
          Login
        </h1>
        <div className={styles.divider}></div>
        <h1
          className={action === 'Register' ? null : styles.notActive}
          onClick={actionChangedHandler}
        >
          Register
        </h1>
      </div>

      <form onSubmit={submitFormHandler}>
        {errorMessage ? (
          <p className={styles.errorMessage}>{errorMessage}</p>
        ) : null}
        {action === 'Register' ? (
          <input
            type="text"
            value={name}
            placeholder="Name"
            required
            onChange={nameHanlder}
          />
        ) : (
          <p>Login to have your notes and files saved on the cloud</p>
        )}
        <input
          type="email"
          value={email}
          placeholder="Email"
          required
          onChange={emailHanlder}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          minLength="8"
          required
          onChange={passwordHanlder}
        />
        <input className={styles.login_register} type="submit" value={action} />
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (credentials, action) =>
    dispatch(actions[action.toLowerCase()](credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
