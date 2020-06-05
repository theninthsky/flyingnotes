import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import styles from './User.module.scss'

import userLogo from '../../assets/images/user-astronaut.svg'

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

const User = ({ app: { theme, errorMessage }, user, notes, onUpdate, onFormSubmit, onLogout }) => {
  const [name, setName] = useState(user.name)
  const [password, setPassword] = useState('')
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState()

  const history = useHistory()

  useEffect(() => {
    if (!user.name) {
      history.push('/auth')
    }
  }, [user.name, history])

  const nameHanlder = event => {
    setName(event.currentTarget.textContent)
    onUpdate(event.currentTarget.textContent)
  }

  const submitFormHandler = event => {
    event.preventDefault()
    onFormSubmit({ password, newPassword })
  }

  return (
    <div className={styles.user}>
      <img className={`${styles.userLogo} ${theme === 'dark' ? styles.userLogoDark : ''}`} src={userLogo} alt="User" />

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
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <input
            type="password"
            value={password}
            placeholder="Password"
            minLength="8"
            required
            onChange={event => setPassword(event.target.value)}
          />

          <input
            type="password"
            value={newPassword}
            placeholder="New Password"
            minLength="8"
            onChange={event => setNewPassword(event.target.value)}
          />

          <input className={styles.update} type="submit" />
        </form>
      ) : (
        <>
          <button className={styles.changePassword} onClick={() => setChangePasswordMode(true)}>
            Change Password
          </button>
          <div className={styles.info}>
            <h1>{`Notes: ${notes.length}`}</h1>
          </div>

          <input className={styles.logout} type="submit" value="Logout" onClick={onLogout} />
        </>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
