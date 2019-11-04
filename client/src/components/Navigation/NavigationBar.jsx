import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auth from '../../containers/Auth/Auth';
import Theme from './Theme';
import styles from './NavigationBar.module.scss';
import userImage from '../../assets/images/user-astronaut.svg';

const NavigationBar = props => {
    const [showAuth, setShowAuth] = useState(false);

    const toggleAuthHandler = () => {
        setShowAuth(prev => prev ? false : true);
    }
    
    return (
        <>
            <div className={styles.navBar} style={{color: props.theme === 'light' ? 'inherit' : 'white'}}>
                <Theme />
                <div className={styles.name}>{props.name ? props.name + `'s Notes` : `Local Notes`}</div>
                <div className={styles.login} onClick={toggleAuthHandler}>
                    {props.name ? <img src={userImage} alt="Account" title="Account" style={{filter: `invert(${props.theme === 'light' ? '0%' : '100%'})`}} /> : 'Login'}
                </div>
            </div>
            {showAuth ? <Auth toggleAuth={toggleAuthHandler} /> : null}
        </>
    );
};

const mapStateToProps = state => ({
    name: state.user.name
});

export default connect(mapStateToProps)(NavigationBar);