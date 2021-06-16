import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { userState, authVisibleState } from 'containers/App/atoms'
import { userLoggedInSelector } from 'containers/App/selectors'
import { THEME_LIGHT, THEME_DARK, LOG_IN } from './constants'
import If from 'components/If'
import CookiesMessage from 'components/CookiesMessage'

import style from './NavigationBar.scss'
import Logo from 'images/logo.svg'
import ThemeIcon from 'images/theme.svg'
import UserIcon from 'images/user-astronaut.svg'

const NavigationBar = () => {
  const user = useRecoilValue(userState)
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [authVisible, setAuthVisible] = useRecoilState(authVisibleState)

  const [cookiesMessageIsVisible, setCookiesMessageIsVisible] = useState(true)

  const toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === THEME_DARK ? THEME_LIGHT : THEME_DARK

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <nav className={style.wrapper}>
        <Logo className={style.logo} />

        <div style={{ flexGrow: '1' }}>
          <NavLink className={style.navLink} activeClassName={style.active} exact to="/">
            Notes
          </NavLink>

          <NavLink className={style.navLink} activeClassName={style.active} to="/lists">
            Lists
          </NavLink>

          <If condition={userLoggedIn}>
            <NavLink className={style.navLink} activeClassName={style.active} to="/files">
              Files
            </NavLink>
          </If>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon className={style.themeIcon} onClick={toggleTheme} />

          {userLoggedIn ? (
            <button className={style.auth} title={user.name} onClick={() => setAuthVisible(!authVisible)}>
              <UserIcon className={style.userIcon} />
            </button>
          ) : (
            <button
              className={style.auth}
              title={LOG_IN}
              onClick={() => {
                setAuthVisible(!authVisible)
                setCookiesMessageIsVisible(false)
              }}
            >
              {LOG_IN}
            </button>
          )}
        </div>
      </nav>

      <If condition={cookiesMessageIsVisible && !userLoggedIn}>
        <CookiesMessage onClick={() => setCookiesMessageIsVisible(false)} />
      </If>
    </>
  )
}

export default NavigationBar
