import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { VIEWPORT_4 } from 'style'

export const Wrapper = styled.nav`
  display: flex;
  padding: 10px 25px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  background-color: #161b22;
  color: white;
`
export const LogoWrap = styled.div`
  display: flex;
  width: 15%;
`
export const Logo = styled.img`
  align-self: center;
  height: 35px;
`
export const StyledNavLink = styled(NavLink)`
  padding: 0 6px;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  font-size: 22px;
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
  justify-content: flex-end;
  align-items: center;
  width: 15%;
`
export const ThemeImage = styled.img`
  width: 26px;
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
  width: 20px;
  filter: invert(100%);

  @media ${VIEWPORT_4} {
    width: 22px;
  }
`
export const Auth = styled.button`
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

  @media (hover: hover) {
    &:hover {
      opacity: 0.5;
    }
  }
`
