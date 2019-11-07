import React, { useState } from 'react';
import { connect } from 'react-redux';

import Backdrop from './Backdrop';
import styles from './Auth.module.scss';
import * as actions from '../../store/actions/index';

const Auth = props => {
  const [action, setAction] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const actionChangedHandler = event => {
    setAction(event.target.innerHTML);
    setName('');
    setPassword('');
  };

  const nameHanlder = event => setName(event.target.value);

  const emailHanlder = event => setEmail(event.target.value);

  const passwordHanlder = event => setPassword(event.target.value);

  const submitFormHandler = event => {
    event.preventDefault();
    props.onFormSubmit({ name: name.trim(), email, password }, action.toLowerCase());
    props.toggleAuth();
  };

  const backgroundTheme = {
    color: props.theme === 'light' ? 'inherit' : 'white',
    backgroundColor: props.theme === 'light' ? 'white' : 'rgb(32, 32, 32)'
  };
  
  return (
    <>
      <Backdrop className={styles.animated} theme={props.theme} toggleAuth={props.toggleAuth} />
      <div className={styles.auth} style={backgroundTheme}>
        <div className={styles.title}>
          <h1 
            className={action === 'Login' ? null : styles.notActive}
            style={{ color: backgroundTheme.color }}
            onClick={actionChangedHandler}
          >
            Login
          </h1>
          <div className={styles.divider}></div>
          <h1 
            className={action === 'Register' ? null : styles.notActive}
            style={{ color: backgroundTheme.color }}
            onClick={actionChangedHandler}
          >
            Register
          </h1>
        </div>
        <form action={`http://localhost:3000/${action}`} method="post" onSubmit={submitFormHandler}>
          {action === 'Register' ? 
              <input type="text" value={name} name="name" placeholder="Name" required onChange={nameHanlder} /> :
              <p>Login so your notes could fly on the cloud</p>}
          <input type="email" value={email} name="email" placeholder="Email" onChange={emailHanlder} required />
          <input type="password" value={password} name="password" placeholder="Password" minLength="8" onChange={passwordHanlder} required />
          <input className={styles.submit} type="submit" />
        </form>
        <button onClick={props.onLogout}>Logout</button>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (credentials, action) => dispatch(actions[action](credentials)),
  onLogout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(Auth);