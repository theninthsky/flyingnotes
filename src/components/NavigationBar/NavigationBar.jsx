import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { themeState, authIsVisibleState, userState } from 'atoms'
import { THEME_LIGHT, THEME_DARK, LOG_IN } from './constants'
import If from 'components/If'
import CookiesMessage from 'components/CookiesMessage'
import { Wrapper, Logo, NavItems, StyledNavLink, Util, ThemeImage, UserImage, Auth } from './style'

import logo from 'images/logo.svg'
import lightThemeIcon from 'images/theme-light.svg'
import darkThemeIcon from 'images/theme-dark.svg'
import userIcon from 'images/user-astronaut.svg'

const NavigationBar = () => {
  const [theme, setTheme] = useRecoilState(themeState)
  const user = useRecoilValue(userState)
  const [authIsVisible, setAuthIsVisible] = useRecoilState(authIsVisibleState)

  const [cookiesMessageIsVisible, setCookiesMessageIsVisible] = useState(true)

  const toggleTheme = () => {
    const newTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK

    document.documentElement.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <Wrapper>
        <Logo src={logo} alt="logo" />

        <NavItems>
          <StyledNavLink exact to="/">
            Notes
          </StyledNavLink>

          {user.name && (
            <StyledNavLink exact to="/files">
              Files
            </StyledNavLink>
          )}
        </NavItems>

        <Util>
          <ThemeImage
            src={theme === THEME_LIGHT ? lightThemeIcon : darkThemeIcon}
            alt="Theme"
            title="Change Theme"
            onClick={toggleTheme}
          />

          {user.name ? (
            <Auth title={user.name} onClick={() => setAuthIsVisible(!authIsVisible)}>
              <UserImage src={userIcon} alt={user.name} />
            </Auth>
          ) : (
            <Auth
              title={LOG_IN}
              onClick={() => {
                setAuthIsVisible(!authIsVisible)
                setCookiesMessageIsVisible(false)
              }}
            >
              {LOG_IN}
            </Auth>
          )}
        </Util>
      </Wrapper>

      <If condition={cookiesMessageIsVisible && !user.name}>
        <CookiesMessage toggle={mode => setCookiesMessageIsVisible(mode)} />
      </If>
    </>
  )
}

export default NavigationBar
