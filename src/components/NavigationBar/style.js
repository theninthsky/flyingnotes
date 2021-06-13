import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { VIEWPORT_4, NOT_MOBILE } from 'media-queries'

import Theme from 'images/theme.svg'
import User from 'images/user-astronaut.svg'

export const Wrapper = styled.nav`
  display: flex;
  padding: 10px 15px;
  width: 100%;
  border-bottom: 2.5px solid var(--secondary-color);
  box-sizing: border-box;
  align-items: center;

  @media ${VIEWPORT_4} {
    padding: 12.5px 30px;
  }
`
export const StyledNavLink = styled(NavLink)`
  padding: 0 6px;
  box-sizing: border-box;
  color: var(--text-color);
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  opacity: 0.5;

  &.active {
    cursor: default;
    opacity: 1;
  }

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 1;
    }
  }
`
export const ThemeIcon = styled(Theme)`
  width: 24px;
  background-image: var(--theme-icon);
  background-repeat: no-repeat;
  cursor: pointer;
  user-select: none;

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 0.5;
    }
  }
`
export const UserIcon = styled(User)`
  align-self: center;
  width: 20px;
`
export const Auth = styled.button`
  display: flex;
  margin-left: 10px;
  padding: 0;
  font-family: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 0.5;
    }
  }
`
