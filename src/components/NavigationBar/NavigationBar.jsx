import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import CookiesMessage from '../CookiesMessage/CookiesMessage'

import style from './NavigationBar.module.scss'
import logo from '../../assets/images/logo.svg'
import lightThemeIcon from '../../assets/images/theme-light.svg'
import darkThemeIcon from '../../assets/images/theme-dark.svg'
import userIcon from '../../assets/images/user-astronaut.svg'

export default ({ theme, user, changeTheme }) => {
  const [showCookiesMessage, setShowCookiesMessage] = useState(true)

  return (
    <>
      <nav className={style.navBar}>
        <div className={style.logoWrap}>
          <img className={style.logo} src={logo} alt="logo" />
        </div>

        <div className={style.links}>
          <NavLink className={style.link} activeClassName={style.active} exact to="/">
            Notes
          </NavLink>

          {user.name && (
            <NavLink className={style.link} activeClassName={style.active} exact to="/files">
              Files
            </NavLink>
          )}
        </div>

        <div className={style.util}>
          <img
            className={style.theme}
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
              <img className={style.user} src={userIcon} alt={user.name} />
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
