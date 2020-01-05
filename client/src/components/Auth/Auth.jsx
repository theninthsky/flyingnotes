import React, { useState } from 'react';
import { connect } from 'react-redux';

import Backdrop from '../UI/Backdrop';
import styles from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import userLogo from '../../assets/images/user-astronaut.svg';

const Auth = props => {
  const [action, setAction] = useState('Login');
  const [updateMode, setUpdateMode] = useState(false);
  const [name, setName] = useState(props.user.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const actionChangedHandler = event => {
    setAction(event.target.innerHTML);
    setName('');
    setPassword('');
    props.clearError();
    props.toggleAuth(true);
  };

  const updateModeHandler = mode => {
    setUpdateMode(mode);
    setAction('Update');
  };

  const nameHanlder = event => setName(event.target.value);

  const emailHanlder = event => setEmail(event.target.value);

  const passwordHanlder = event => setPassword(event.target.value);

  const showNewPasswordHandler = () => setShowNewPassword(true);

  const newPasswordHandler = event => setNewPassword(event.target.value);

  const submitFormHandler = async event => {
    event.preventDefault();
    props.onFormSubmit({ name: name.trim(), email, password, newPassword }, action.toLowerCase());
    props.clearError();
    props.toggleAuth(false);
  };

  return (
    <>
      <Backdrop className={styles.animated} theme={props.theme} toggleAuth={() => props.toggleAuth(false)} clearError={props.clearError} />
      <div className={`${styles.auth} ${props.theme === 'dark' ? styles.authDark : ''}`}>
        {props.user.name ?
          <>
            <img
              className={`${styles.userLogo} ${props.theme === 'dark' ? styles.userLogoDark : ''}`}
              src={userLogo}
              alt="User"
            />
            {updateMode ?
              <form onSubmit={submitFormHandler}>
                {props.user.errorMessage ? <p className={styles.errorMessage}>{props.user.errorMessage}</p> : null}
                <input type="text" value={name} placeholder="Name" required onChange={nameHanlder} />
                <input type="password" value={password} placeholder="Password" minLength="8" required onChange={passwordHanlder} />
                {showNewPassword ?
                  <input type="password" value={newPassword} placeholder="New Password" minLength="8" onChange={newPasswordHandler} /> :
                  <button className={`${styles.showNewPassword} ${props.theme === 'dark' ? styles.showNewPasswordDark : ''}`} onClick={showNewPasswordHandler}>
                    ➤ Change password
                </button>}
                <input className={styles.update} type="submit" value={action} />
              </form> :
              <>
                <h1 className={styles.greeting}>{'Logged in as ' + props.user.name}
                  <button className={styles.updateButton} title="Change name or password" onClick={updateModeHandler}>
                    Update
                </button>
                </h1>
                <input
                  className={styles.logout}
                  type="submit"
                  value="Logout"
                  onClick={() => { props.onLogout(); props.toggleAuth(false); props.toggleCookiesMessage(true); }}
                />
              </>}
          </> :
          <>
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
              {props.user.errorMessage ? <p className={styles.errorMessage}>{props.user.errorMessage}</p> : null}
              {action === 'Register' ?
                <input type="text" value={name} placeholder="Name" required onChange={nameHanlder} /> :
                <p>Login to have your notes saved on the cloud</p>}
              <input type="email" value={email} placeholder="Email" required onChange={emailHanlder} />
              <input type="password" value={password} placeholder="Password" minLength="8" required onChange={passwordHanlder} />
              <input className={styles.login_register} type="submit" value={action} />
            </form>
          </>}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (credentials, action) => dispatch(actions[action](credentials)),
  onLogout: () => dispatch(actions.logout()),
  clearError: () => dispatch(actions.clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);