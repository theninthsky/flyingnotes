import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import style from './Auth.module.scss'

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (credentials, action) => dispatch(actions[action.toLowerCase()](credentials)),
})

const Auth = ({ app: { errorMessage }, user, onFormSubmit }) => {
  const [action, setAction] = useState('Login')
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (user.name) {
      history.push('/account')
    }
  }, [user.name, history])

  const actionChangedHandler = event => {
    setAction(event.target.innerHTML)
    setName('')
    setPassword('')
  }

  const submitFormHandler = event => {
    event.preventDefault()
    onFormSubmit({ name: name.trim(), email, password }, action.toLowerCase())
  }

  return (
    <div className={style.auth}>
      <div className={style.title}>
        <h1 className={action === 'Login' ? null : style.notActive} onClick={actionChangedHandler}>
          Login
        </h1>
        <div className={style.divider}></div>
        <h1 className={action === 'Register' ? null : style.notActive} onClick={actionChangedHandler}>
          Register
        </h1>
      </div>

      <form onSubmit={submitFormHandler}>
        {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
        {action === 'Register' ? (
          <input type="text" value={name} placeholder="Name" required onChange={event => setName(event.target.value)} />
        ) : (
          <p>Login to have your notes and files saved on the cloud</p>
        )}
        <input
          type="email"
          value={email}
          placeholder="Email"
          required
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          minLength="8"
          required
          onChange={event => setPassword(event.target.value)}
        />
        <input className={style.login_register} type="submit" value={action} />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
