import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { userState, authVisibleState } from 'atoms'
import { userLoggedInSelector } from 'selectors'
import { THEME_LIGHT, THEME_DARK, LOG_IN } from './constants'
import { If, CookiesMessage } from 'components'
import { Wrapper, StyledNavLink, ThemeIcon, UserIcon, Auth } from './style'

import Logo from 'images/logo.svg'

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
      <Wrapper>
        <Logo style={{ width: '34px', marginRight: '10px' }} />

        <div style={{ flexGrow: '1' }}>
          <StyledNavLink exact to="/">
            Notes
          </StyledNavLink>

          <StyledNavLink to="/lists">Lists</StyledNavLink>

          <If condition={userLoggedIn}>
            <StyledNavLink to="/files">Files</StyledNavLink>
          </If>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon onClick={toggleTheme} />

          {userLoggedIn ? (
            <Auth title={user.name} onClick={() => setAuthVisible(!authVisible)}>
              <UserIcon />
            </Auth>
          ) : (
            <Auth
              title={LOG_IN}
              onClick={() => {
                setAuthVisible(!authVisible)
                setCookiesMessageIsVisible(false)
              }}
            >
              {LOG_IN}
            </Auth>
          )}
        </div>
      </Wrapper>

      <If condition={cookiesMessageIsVisible && !userLoggedIn}>
        <CookiesMessage onClick={() => setCookiesMessageIsVisible(false)} />
      </If>
    </>
  )
}

export default NavigationBar
