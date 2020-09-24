import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { updateUser, changePassword, logout } from '../../store/actions'

import userLogo from '../../assets/images/user-astronaut.svg'
import style from './User.module.scss'

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  notes: state.notes,
})

const mapDispatchToProps = { changePassword, logout }

const User = ({ app: { theme, errorMessage }, user, notes, changePassword, logout }) => {
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
    updateUser(event.currentTarget.textContent)
  }

  const submitFormHandler = event => {
    event.preventDefault()
    changePassword(password, newPassword)
  }

  return (
    <div className={style.user}>
      <img className={`${style.userLogo} ${theme === 'dark' ? style.userLogoDark : ''}`} src={userLogo} alt="User" />

      <h1
        className={style.name}
        contentEditable
        suppressContentEditableWarning={true}
        spellCheck="false"
        onBlur={nameHanlder}
      >
        {name}
      </h1>

      {changePasswordMode || errorMessage ? (
        <form onSubmit={submitFormHandler}>
          {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
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

          <input className={style.update} type="submit" />
        </form>
      ) : (
        <>
          <button className={style.changePassword} onClick={() => setChangePasswordMode(true)}>
            Change Password
          </button>
          <div className={style.info}>
            <h1>{`Notes: ${notes.length}`}</h1>
          </div>

          <input className={style.logout} type="submit" value="Logout" onClick={logout} />
        </>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
