import { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRecoilState } from 'recoil'

import CookiesMessage from './CookiesMessage'
import { toggleAuth } from '../../store/actions'
import { toggleTheme } from './actions'
import { themeState } from '../App/atoms'
import { Wrapper, LogoWrap, Logo, StyledNavLink, Util, ThemeImage, UserImage, Auth } from './style'

import logo from '../../assets/images/logo.svg'
import lightThemeIcon from '../../assets/images/theme-light.svg'
import darkThemeIcon from '../../assets/images/theme-dark.svg'
import userIcon from '../../assets/images/user-astronaut.svg'

const NavigationBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user, shallowEqual)

  const [theme, setTheme] = useRecoilState(themeState)

  const [showCookiesMessage, setShowCookiesMessage] = useState(true)

  return (
    <>
      <Wrapper>
        <LogoWrap>
          <Logo src={logo} alt="logo" />
        </LogoWrap>

        <div>
          <StyledNavLink exact to="/">
            Notes
          </StyledNavLink>

          {user.name && (
            <StyledNavLink exact to="/files">
              Files
            </StyledNavLink>
          )}
        </div>

        <Util>
          <ThemeImage
            src={theme === 'light' ? lightThemeIcon : darkThemeIcon}
            alt="Theme"
            title="Change Theme"
            onClick={() => toggleTheme(theme, setTheme)}
          />

          {user.name ? (
            <Auth title={`Logged in as ${user.name}`} onClick={() => dispatch(toggleAuth())}>
              <UserImage src={userIcon} alt={user.name} />
            </Auth>
          ) : (
            <Auth
              title={'Login'}
              onClick={() => {
                dispatch(toggleAuth())
                setShowCookiesMessage(false)
              }}
            >
              {'Login'}
            </Auth>
          )}
        </Util>
      </Wrapper>

      {showCookiesMessage && !user.name && (
        <CookiesMessage theme={theme} toggle={mode => setShowCookiesMessage(mode)} />
      )}
    </>
  )
}

export default NavigationBar
