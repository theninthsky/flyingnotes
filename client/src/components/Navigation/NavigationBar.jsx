import React, { useState } from 'react';

import Auth from '../Auth/Auth';
import Theme from '../UI/Theme';
import styles from './NavigationBar.module.scss';
import userImage from '../../assets/images/user-astronaut.svg';

const NavigationBar = props => {
    const { name, theme, loading, errorMessage } = props.user;
    
    const [showAuth, setShowAuth] = useState(false);

    const toggleAuthHandler = mode => setShowAuth(mode);
    
    return (
        <>
            <div className={styles.navBar} style={{color: theme === 'light' ? 'inherit' : 'white'}}>
                <Theme />
                <h1 className={styles.title}>Flying Notes</h1>
                <div className={styles.login} onClick={toggleAuthHandler}>
                    { name ? 
                        <img
                            src={userImage} 
                            alt="Account" 
                            title="Account" 
                            style={{width: '20px', filter: `invert(${theme === 'light' ? '0%' : '100%'})`}} 
                        /> : 
                        'Login' }
                </div>
            </div>
            { showAuth || loading || errorMessage ? <Auth theme={theme} toggleAuth={toggleAuthHandler} /> : null }
        </>
    );
};

export default NavigationBar;