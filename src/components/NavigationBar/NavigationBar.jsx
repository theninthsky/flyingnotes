import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { If } from 'frontend-essentials'
import cx from 'clsx'

import Tooltip from './Tooltip'

import style from './NavigationBar.scss'
import Logo from 'images/logo.svg'
import UserIcon from 'images/user-astronaut.svg'

const NavigationBar = ({ user, onLogout }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)

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

        <If condition={tooltipOpen}>
          <Tooltip email={user.email} onLogout={onLogout} onClose={() => setTooltipOpen(false)} />
        </If>

        <div className={cx('d-flex', 'align-items-center')}>
          <button className={style.user} title={user.name} onClick={() => setTooltipOpen(true)}>
            <UserIcon className={style.userIcon} />
          </button>
        </div>
      </nav>
    </>
  )
}

export default NavigationBar
