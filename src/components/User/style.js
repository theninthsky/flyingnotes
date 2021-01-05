import styled from 'styled-components'

import { Wrapper as AuthWrapper, Input as AuthInput, Submit as AuthSubmit } from 'components/Auth/style'

export const Wrapper = styled(AuthWrapper)`
  height: 380px;
`
export const UserLogo = styled.img`
  margin: 10px auto;
  width: 20%;
  border-radius: 100%;
  filter: ${({ theme }) => (theme === 'dark' ? 'invert(100%)' : 'none')};
`
export const Name = styled.input`
  align-self: center;
  border: none;
  text-align: center;
  font-size: 20px;
  color: inherit;
  background-color: transparent;
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
