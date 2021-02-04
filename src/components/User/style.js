import styled from 'styled-components'

import { ANIMATION_DURATION } from 'media-queries'
import { Wrapper as AuthWrapper, Input as AuthInput, Submit as AuthSubmit } from 'components/Auth/style'

export const Wrapper = styled(AuthWrapper)`
  height: 380px;
  animation: showUser ${ANIMATION_DURATION}ms;

  @keyframes showUser {
    from {
      opacity: 0;
    }
  }
`
export const UserLogo = styled.img`
  margin: 10px auto;
  width: 20%;
  border-radius: 100%;
  filter: ${({ theme }) => (theme === 'dark' ? 'invert(100%)' : 'none')};
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

  &:focus {
    border: 1px solid var(--secondary-color);
  }
`
export const ErrorMessage = styled.p`
  text-align: center;
  color: red;
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

  &:hover {
    opacity: 0.75;
  }
`
export const Submit = styled(AuthSubmit)``
