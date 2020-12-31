import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { themeState, authIsVisibleState, userState } from 'atoms'
import { THEME_LIGHT, THEME_DARK, LOGIN } from './constants'
import If from 'components/If'
import CookiesMessage from 'components/CookiesMessage'
import { Wrapper, LogoWrap, Logo, StyledNavLink, Util, ThemeImage, UserImage, Auth } from './style'

import logo from 'assets/images/logo.svg'
import lightThemeIcon from 'assets/images/theme-light.svg'
import darkThemeIcon from 'assets/images/theme-dark.svg'
import userIcon from 'assets/images/user-astronaut.svg'

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
            src={theme === THEME_LIGHT ? lightThemeIcon : darkThemeIcon}
            alt="Theme"
            title="Change Theme"
            onClick={toggleTheme}
          />

          {user.name ? (
            <Auth title={`Logged in as ${user.name}`} onClick={() => setAuthIsVisible(!authIsVisible)}>
              <UserImage src={userIcon} alt={user.name} />
            </Auth>
          ) : (
            <Auth
              title={LOGIN}
              onClick={() => {
                setAuthIsVisible(!authIsVisible)
                setCookiesMessageIsVisible(false)
              }}
            >
              {LOGIN}
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
