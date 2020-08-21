import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import CookiesMessage from '../CookiesMessage/CookiesMessage'

import lightThemeIcon from '../../assets/images/theme-light.svg'
import darkThemeIcon from '../../assets/images/theme-dark.svg'
import userIcon from '../../assets/images/user-astronaut.svg'
import style from './NavigationBar.module.scss'

export default ({ theme, user, changeTheme }) => {
  const [showCookiesMessage, setShowCookiesMessage] = useState(true)

  return (
    <>
      <nav className={style.navBar}>
        <div>
          <NavLink className={style.item} activeClassName={style.active} exact to="/notes">
            Notes
          </NavLink>

          {user.name && (
            <NavLink className={style.item} activeClassName={style.active} exact to="/files">
              Files
            </NavLink>
          )}
        </div>

        <div>
          <img
            className={`${style.theme} ${theme === 'dark' ? style.themeDark : ''}`}
            src={theme === 'light' ? lightThemeIcon : darkThemeIcon}
            alt="Theme"
            title="Change Theme"
            onClick={changeTheme}
          />

          {user.name ? (
            <NavLink
              className={style.auth}
              activeClassName={style.active}
              title={`Logged in as ${user.name}`}
              to={'/account'}
            >
              <img
                className={`${style.user} ${theme === 'dark' ? style.userDark : ''}`}
                src={userIcon}
                alt={user.name}
              />
            </NavLink>
          ) : (
            <NavLink className={style.auth} activeClassName={style.active} title={'Login'} to={'/auth'}>
              {'Login'}
            </NavLink>
          )}
        </div>
      </nav>

      {showCookiesMessage && !user.name && (
        <CookiesMessage theme={theme} toggle={mode => setShowCookiesMessage(mode)} />
      )}
    </>
  )
}
