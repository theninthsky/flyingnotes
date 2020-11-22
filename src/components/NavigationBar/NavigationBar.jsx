import { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import CookiesMessage from './CookiesMessage'
import { changeTheme, toggleAuth } from '../../store/actions'
import { Wrapper, LogoWrap, Logo, StyledNavLink, Util, ThemeImage, UserImage, Auth } from './style'

import logo from '../../assets/images/logo.svg'
import lightThemeIcon from '../../assets/images/theme-light.svg'
import darkThemeIcon from '../../assets/images/theme-dark.svg'
import userIcon from '../../assets/images/user-astronaut.svg'

const NavigationBar = () => {
  const dispatch = useDispatch()
  const { theme, user } = useSelector(({ app: { theme }, user }) => ({ theme, user }), shallowEqual)

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
            onClick={() => dispatch(changeTheme())}
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
