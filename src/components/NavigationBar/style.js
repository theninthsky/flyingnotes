import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { VIEWPORT_4 } from 'style'

export const Wrapper = styled.nav`
  display: flex;
  padding: 12.5px 15px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  background-color: #161b22;
  color: white;

  @media ${VIEWPORT_4} {
    padding: 12.5px 30px;
  }
`
export const Logo = styled.img`
  width: 34px;
  margin-right: 10px;
`
export const NavItems = styled.div`
  flex-grow: 1;
`
export const StyledNavLink = styled(NavLink)`
  padding: 0 6px;
  box-sizing: border-box;
  color: inherit;
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

  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }
`
export const Util = styled.div`
  display: flex;
  align-items: center;
`
export const ThemeImage = styled.img`
  width: 24px;
  filter: invert(100%);
  cursor: pointer;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      opacity: 0.5;
    }
  }
`
export const UserImage = styled.img`
  align-self: center;
  width: 18px;
  filter: invert(100%);
`
export const Auth = styled.button`
  display: flex;
  margin-left: 10px;
  font-family: inherit;
  font-size: 22px;
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      opacity: 0.5;
    }
  }
`
