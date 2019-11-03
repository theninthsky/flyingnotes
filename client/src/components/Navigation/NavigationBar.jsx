import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auth from '../../containers/Auth/Auth';
import styles from './NavigationBar.module.scss';
import userImage from '../../assets/images/user.svg';

const NavigationBar = props => {
    const [showAuth, setShowAuth] = useState(false);

    const toggleAuthHandler = () => {
        setShowAuth(prev => prev ? false : true);
    }
    
    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.name}>{props.name ? props.name + `'s Notes` : `Local Notes`}</div>
            </div>
            <div className={styles.login} onClick={toggleAuthHandler}>{props.name ? <img src={userImage} alt="Account" title="Account" /> : 'Login'}</div>
            {showAuth ? <Auth toggleAuth={toggleAuthHandler} /> : null}
        </>
    );
};

const mapStateToProps = state => ({
    name: state.user.name
});

export default connect(mapStateToProps)(NavigationBar);