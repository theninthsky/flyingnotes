import styled from 'styled-components'

import { Wrapper as AuthWrapper, Input as AuthInput, Submit as AuthSubmit } from 'components/Auth/style'

import UserLogoIcon from 'images/user-astronaut.svg'

export const Wrapper = styled(AuthWrapper)`
  height: 380px;
  animation: showUser 0.25s;

  @keyframes showUser {
    from {
      opacity: 0;
    }
  }
`
export const UserLogo = styled(UserLogoIcon)`
  position: relative;
  left: 5px;
  margin: 20px auto 0;
  width: 60px;
`
export const Name = styled.input`
  align-self: center;
  padding: 4px 0;
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  color: inherit;
  background-color: transparent;

  :focus {
    border: 1px solid var(--secondary-color);
  }
`
export const Input = styled(AuthInput)``

export const ChangePassword = styled.button`
  display: block;
  margin: 0 auto;
  border: none;
  color: inherit;
  font-size: 14px;
  background-color: transparent;
  cursor: pointer;

  :hover {
    opacity: 0.75;
  }
`
export const Submit = styled(AuthSubmit)``
