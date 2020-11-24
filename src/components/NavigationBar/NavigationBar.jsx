import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import CookiesMessage from './CookiesMessage'
import { themeState, authIsOpenState } from '../App/atoms'
import { userState } from '../User/atoms'
import { Wrapper, LogoWrap, Logo, StyledNavLink, Util, ThemeImage, UserImage, Auth } from './style'

import logo from '../../assets/images/logo.svg'
import lightThemeIcon from '../../assets/images/theme-light.svg'
import darkThemeIcon from '../../assets/images/theme-dark.svg'
import userIcon from '../../assets/images/user-astronaut.svg'

const NavigationBar = () => {
  const [theme, setTheme] = useRecoilState(themeState)
  const user = useRecoilValue(userState)
  const [authIsOpen, setAuthIsOpen] = useRecoilState(authIsOpenState)

  const [showCookiesMessage, setShowCookiesMessage] = useState(true)

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'

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
            src={theme === 'light' ? lightThemeIcon : darkThemeIcon}
            alt="Theme"
            title="Change Theme"
            onClick={toggleTheme}
          />

          {user.name ? (
            <Auth title={`Logged in as ${user.name}`} onClick={() => setAuthIsOpen(!authIsOpen)}>
              <UserImage src={userIcon} alt={user.name} />
            </Auth>
          ) : (
            <Auth
              title={'Login'}
              onClick={() => {
                setAuthIsOpen(!authIsOpen)
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
