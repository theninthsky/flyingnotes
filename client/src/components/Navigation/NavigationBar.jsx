import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import CookiesMessage from './CookiesMessage'
import styles from './NavigationBar.module.scss'

import lightThemeIcon from '../../assets/images/theme-light.svg'
import darkThemeIcon from '../../assets/images/theme-dark.svg'
import userIcon from '../../assets/images/user-astronaut.svg'

const NavigationBar = props => {
  const { theme, user } = props

  const [showCookiesMessage, setShowCookiesMessage] = useState(true)

  const toggleCookiesMessageHandler = mode => setShowCookiesMessage(mode)

  return (
    <>
      <nav
        className={`${styles.navBar} ${
          theme === 'dark' ? styles.navBarDark : ''
        }`}
      >
        <img
          className={`${styles.theme} ${
            theme === 'dark' ? styles.themeDark : ''
          }`}
          src={theme === 'light' ? lightThemeIcon : darkThemeIcon}
          alt="Theme"
          title="Theme"
          onClick={props.changeTheme}
        />

        <NavLink
          className={`${styles.notes} ${
            theme === 'dark' ? styles.notesDark : ''
          }`}
          activeClassName={styles.active}
          exact
          to="/"
        >
          Notes
        </NavLink>

        {user.name ? (
          <NavLink
            className={`${styles.auth} ${
              theme === 'dark' ? styles.authDark : ''
            }`}
            activeClassName={styles.active}
            title={`Logged in as ${user.name}`}
            to={'/account'}
          >
            <img
              className={`${styles.user} ${
                theme === 'dark' ? styles.userDark : ''
              }`}
              src={userIcon}
              alt={user.name}
            />
          </NavLink>
        ) : (
          <NavLink
            className={`${styles.auth} ${
              theme === 'dark' ? styles.authDark : ''
            }`}
            activeClassName={styles.active}
            title={'Login'}
            to={'/auth'}
          >
            {'Login'}
          </NavLink>
        )}
      </nav>

      {showCookiesMessage && !user.name ? (
        <CookiesMessage theme={theme} toggle={toggleCookiesMessageHandler} />
      ) : null}
    </>
  )
}

export default NavigationBar
