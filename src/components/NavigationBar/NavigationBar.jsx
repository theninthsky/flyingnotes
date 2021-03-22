import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { authIsVisibleState, userState } from 'atoms'
import { EMPTY_IMAGE } from 'global-constants'
import { THEME_LIGHT, THEME_DARK, LOG_IN } from './constants'
import { If, CookiesMessage } from 'components'
import { Wrapper, StyledNavLink, ThemeImage, UserImage, Auth } from './style'

import logo from 'images/logo.svg'

const NavigationBar = () => {
  const user = useRecoilValue(userState)
  const [authIsVisible, setAuthIsVisible] = useRecoilState(authIsVisibleState)

  const [cookiesMessageIsVisible, setCookiesMessageIsVisible] = useState(true)

  const toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === THEME_DARK ? THEME_LIGHT : THEME_DARK

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <Wrapper>
        <img style={{ width: '34px', marginRight: '10px' }} src={logo} alt="logo" />

        <div style={{ flexGrow: '1' }}>
          <StyledNavLink exact to="/">
            Notes
          </StyledNavLink>

          <StyledNavLink exact to="/lists">
            Lists
          </StyledNavLink>

          {user.name && (
            <StyledNavLink exact to="/files">
              Files
            </StyledNavLink>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeImage src={EMPTY_IMAGE} alt="Theme" title="Change Theme" onClick={toggleTheme} />

          {user.name ? (
            <Auth title={user.name} onClick={() => setAuthIsVisible(!authIsVisible)}>
              <UserImage src={EMPTY_IMAGE} alt={user.name} />
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
        </div>
      </Wrapper>

      <If condition={cookiesMessageIsVisible && !user.name}>
        <CookiesMessage onClick={() => setCookiesMessageIsVisible(false)} />
      </If>
    </>
  )
}

export default NavigationBar
