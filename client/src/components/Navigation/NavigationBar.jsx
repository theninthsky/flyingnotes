import React, { useState } from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem';
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
                <NavigationItem url="/"><img className={styles.icon} src={userImage} alt="" />My Notes</NavigationItem>
            </div>
            <div className={styles.login} onClick={toggleAuthHandler}>{props.name || 'Login'}</div>
            {showAuth ? <Auth toggleAuth={toggleAuthHandler} /> : null}
        </>
    );
};

const mapStateToProps = state => ({
    name: state.user.name
});

export default connect(mapStateToProps)(NavigationBar);