import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import CookiesMessage from './CookiesMessage'
import { changeTheme, toggleAuth } from '../../store/actions'

import logo from '../../assets/images/logo.svg'
import lightThemeIcon from '../../assets/images/theme-light.svg'
import darkThemeIcon from '../../assets/images/theme-dark.svg'
import userIcon from '../../assets/images/user-astronaut.svg'

// #region Styles
const Wrapper = styled.nav`
  display: flex;
  margin-bottom: 40px;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  background-color: #3d3c42;
  color: white;
  box-shadow: 0 2px 5px gray;
`
const LogoWrap = styled.div`
  display: flex;
  width: 15%;
`
const Logo = styled.img`
  align-self: center;
  height: 40px;
`
const StyledNavLink = styled(NavLink)`
  padding: 0 6px;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s;
  text-decoration: none;
  font-size: 24px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &.active {
    cursor: default;
    opacity: 1;
  }
`
const Util = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 15%;
`
const ThemeImage = styled.img`
  width: 26px;
  filter: invert(100%);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    &:hover {
      opacity: 1;
    }
  }
`
const UserImage = styled.img`
  align-self: center;
  width: 22px;
  filter: invert(100%);

  @media (max-width: 480px) {
    width: 20px;
    opacity: 1;
  }
`
const Auth = styled.button`
  display: flex;
  margin-left: 15px;
  font-family: inherit;
  font-size: 22px;
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    &:hover {
      opacity: 1;
    }
  }
`
// #endregion

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
