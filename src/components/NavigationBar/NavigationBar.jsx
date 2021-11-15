import { NavLink } from 'react-router-dom'
import cx from 'clsx'

import { THEME_LIGHT, THEME_DARK, LOG_IN } from './constants'

import style from './NavigationBar.scss'
import Logo from 'images/logo.svg'
import ThemeIcon from 'images/theme.svg'
import UserIcon from 'images/user-astronaut.svg'

const NavigationBar = ({ user, authVisible, setAuthVisible }) => {
  const toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === THEME_DARK ? THEME_LIGHT : THEME_DARK

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <nav className={style.wrapper}>
        <Logo className={style.logo} />

        <div className="flex-1">
          <NavLink className={({ isActive }) => cx(style.navLink, { [style.active]: isActive })} to="/">
            Notes
          </NavLink>

          <NavLink className={({ isActive }) => cx(style.navLink, { [style.active]: isActive })} to="/lists">
            Lists
          </NavLink>

          <NavLink className={({ isActive }) => cx(style.navLink, { [style.active]: isActive })} to="/files">
            Files
          </NavLink>
        </div>

        <div className={cx('d-flex', 'align-items-center')}>
          <ThemeIcon className={style.themeIcon} onClick={toggleTheme} />

          {user ? (
            <button className={style.auth} title={user.name} onClick={() => setAuthVisible(!authVisible)}>
              <UserIcon className={style.userIcon} />
            </button>
          ) : (
            <button className={style.auth} title={LOG_IN} onClick={() => setAuthVisible(!authVisible)}>
              {LOG_IN}
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

export default NavigationBar
