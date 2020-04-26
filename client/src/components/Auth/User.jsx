import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import styles from './User.module.scss'

import userLogo from '../../assets/images/user-astronaut.svg'

const User = props => {
  const { theme, errorMessage } = props.app
  const { notes } = props
  const { onUpdate, onFormSubmit, onLogout } = props

  const [name, setName] = useState(props.user.name)
  const [password, setPassword] = useState('')
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState()

  const history = useHistory()

  useEffect(() => {
    if (!props.user.name) {
      history.push('/auth')
    }
  }, [props.user.name, history])

  const nameHanlder = event => {
    setName(event.currentTarget.textContent)
    onUpdate(event.currentTarget.textContent)
  }

  const passwordHanlder = event => setPassword(event.target.value)

  const changePasswordModeHandler = mode => setChangePasswordMode(mode)

  const newPasswordHandler = event => setNewPassword(event.target.value)

  const submitFormHandler = async event => {
    event.preventDefault()
    onFormSubmit({ password, newPassword })
  }

  return (
    <div className={styles.user}>
      <img
        className={`${styles.userLogo} ${
          theme === 'dark' ? styles.userLogoDark : ''
        }`}
        src={userLogo}
        alt="User"
      />

      <h1
        className={styles.name}
        contentEditable
        suppressContentEditableWarning={true}
        spellCheck="false"
        onBlur={nameHanlder}
      >
        {name}
      </h1>

      {changePasswordMode || errorMessage ? (
        <form onSubmit={submitFormHandler}>
          {errorMessage ? (
            <p className={styles.errorMessage}>{errorMessage}</p>
          ) : null}
          <input
            type="password"
            value={password}
            placeholder="Password"
            minLength="8"
            required
            onChange={passwordHanlder}
          />

          <input
            type="password"
            value={newPassword}
            placeholder="New Password"
            minLength="8"
            onChange={newPasswordHandler}
          />

          <input className={styles.update} type="submit" />
        </form>
      ) : (
        <>
          <button
            className={styles.changePassword}
            onClick={() => changePasswordModeHandler(true)}
          >
            Change Password
          </button>
          <div className={styles.info}>
            <h1>{`Notes: ${notes.length}`}</h1>
          </div>

          <input
            className={styles.logout}
            type="submit"
            value="Logout"
            onClick={onLogout}
          />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  notes: state.notes,
})

const mapDispatchToProps = dispatch => ({
  onUpdate: name => dispatch(actions.update(name)),
  onFormSubmit: passwords => dispatch(actions.changePassword(passwords)),
  onLogout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
