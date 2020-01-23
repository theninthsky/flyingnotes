import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import CookiesMessage from './CookiesMessage';
import styles from './NavigationBar.module.scss';

import sunIcon from '../../assets/images/sun.svg';
import moonIcon from '../../assets/images/moon.svg';
import userIcon from '../../assets/images/user-astronaut.svg';

const NavigationBar = props => {
    const { name, theme } = props.user;

    const [showCookiesMessage, setShowCookiesMessage] = useState(true);

    const toggleCookiesMessageHandler = mode => setShowCookiesMessage(mode);

    return (
        <>
            <nav className={`${styles.navBar} ${theme === 'dark' ? styles.navBarDark : ''}`}>
                <div
                    className={`${styles.theme} ${theme === 'dark' ? styles.themeDark : ''}`}
                    title="Change Theme"
                    onClick={props.changeTheme}
                >
                    <img
                        className={`${styles.icon} ${theme === 'dark' ? styles.iconDark : ''}`}
                        src={theme === 'light' ? sunIcon : moonIcon}
                        alt="Theme"
                    />
                </div>

                <NavLink
                    className={`${styles.notes} ${theme === 'dark' ? styles.notesDark : ''}`}
                    activeClassName={styles.active}
                    exact to="/"
                >
                    Notes
                </NavLink>

                {name ?
                    <NavLink
                        className={`${styles.auth} ${theme === 'dark' ? styles.authDark : ''}`}
                        activeClassName={styles.active}
                        title={`Logged in as ${name}`}
                        to={'/account'}
                    >
                        <img className={`${styles.user} ${theme === 'dark' ? styles.userDark : ''}`} src={userIcon} alt={name} />
                    </NavLink> :

                    <NavLink
                        className={`${styles.auth} ${theme === 'dark' ? styles.authDark : ''}`}
                        activeClassName={styles.active}
                        title={'Login'}
                        to={'/auth'}
                    >
                        {'Login'}
                    </NavLink>
                }

            </nav>

            {showCookiesMessage && !name ? <CookiesMessage theme={theme} toggle={toggleCookiesMessageHandler} /> : null}
        </>
    );
};

export default NavigationBar;