import { useState } from 'react'
import { signOut } from 'firebase/auth'
import cx from 'clsx'

import ClickOutsideListener from 'components/ClickOutsideListener'
import style from './UserTooltip.scss'

const [THEME_LIGHT, THEME_DARK] = ['light', 'dark']

const Tooltip = ({ email, auth, onLogoutRef, onClose }) => {
  const [theme, setTheme] = useState(localStorage.theme || THEME_LIGHT)

  const toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === THEME_LIGHT ? THEME_DARK : THEME_LIGHT

    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ClickOutsideListener onClickOutside={onClose}>
      <div className={style.wrapper}>
        <ul className={style.list}>
          <li className={cx(style.item, 'pointer-events-none')}>Signed in as {email}</li>
          <li className={style.item} onClick={toggleTheme}>
            Theme<button className={style.theme}>{theme}</button>
          </li>
          <li
            className={style.item}
            onClick={() => {
              onLogoutRef.current()
              signOut(auth)
            }}
          >
            Sign out
          </li>
        </ul>
      </div>
    </ClickOutsideListener>
  )
}

export default Tooltip
