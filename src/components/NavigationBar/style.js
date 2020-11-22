import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Wrapper = styled.nav`
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
export const LogoWrap = styled.div`
  display: flex;
  width: 15%;
`
export const Logo = styled.img`
  align-self: center;
  height: 40px;
`
export const StyledNavLink = styled(NavLink)`
  padding: 0 6px;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 0.5;

    @media (max-width: 480px) {
      opacity: 1;
    }
  }
`
export const UserImage = styled.img`
  align-self: center;
  width: 22px;
  filter: invert(100%);

  @media (max-width: 480px) {
    width: 20px;
    opacity: 1;
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
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    &:hover {
      opacity: 1;
    }
  }
`
