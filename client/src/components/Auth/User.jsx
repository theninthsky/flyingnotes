import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import styles from './User.module.scss';

import userLogo from '../../assets/images/user-astronaut.svg';


const User = props => {
    const { theme, errorMessage } = props.user;
    const { notes } = props;
    const { onFormSubmit, onLogout, clearError } = props;

    const [name, setName] = useState(props.user.name);
    const [password, setPassword] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = useState();

    const history = useHistory();

    useEffect(() => {
        if (!props.user.name) {
            history.push('/auth');
        }
    }, [props.user.name, history]);

    const nameHanlder = event => setName(event.target.value);

    const passwordHanlder = event => setPassword(event.target.value);

    const updateModeHandler = () => setUpdateMode(true);

    const showNewPasswordHandler = () => setShowNewPassword(true);

    const newPasswordHandler = event => setNewPassword(event.target.value);

    const submitFormHandler = async event => {
        event.preventDefault();
        onFormSubmit({ name: name.trim(), password, newPassword });
        clearError();
    };

    return (
        <div className={`${styles.user} ${theme === 'dark' ? styles.userDark : ''}`}>
            <img
                className={`${styles.userLogo} ${theme === 'dark' ? styles.userLogoDark : ''}`}
                src={userLogo}
                alt="User"
            />

            {updateMode || errorMessage ?
                <form onSubmit={submitFormHandler}>
                    {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}
                    <input type="text" value={name} placeholder="Name" required onChange={nameHanlder} />
                    <input type="password" value={password} placeholder="Password" minLength="8" required onChange={passwordHanlder} />
                    {showNewPassword ?
                        <input type="password" value={newPassword} placeholder="New Password" minLength="8" onChange={newPasswordHandler} /> :
                        <button className={`${styles.showNewPassword} ${theme === 'dark' ? styles.showNewPasswordDark : ''}`} onClick={showNewPasswordHandler}>
                            ➤ Change password
                </button>}
                    <input className={styles.update} type="submit" />
                </form> :

                <>
                    <div className={styles.info}>
                        <h1>{`Name: ${name}`}</h1>
                        <h1>{`Number of Notes: ${notes.length}`}</h1>
                    </div>

                    <button
                        className={styles.updateButton}
                        onClick={updateModeHandler}>
                        Change Name or Password
                    </button>
                    <input
                        className={styles.logout}
                        type="submit"
                        value="Logout"
                        onClick={onLogout}
                    />
                </>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user,
    notes: state.notes
});

const mapDispatchToProps = dispatch => ({
    onFormSubmit: credentials => dispatch(actions.update(credentials)),
    onLogout: () => dispatch(actions.logout()),
    clearError: () => dispatch(actions.clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(User);