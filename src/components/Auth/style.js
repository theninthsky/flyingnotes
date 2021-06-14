import styled from 'styled-components'

import { LOG_IN, SIGN_UP } from './constants'

export const Login = styled.h2`
  font-size: 28px;
  opacity: ${({ action }) => (action === LOG_IN ? '1' : '0.4')};
  cursor: default;

  :hover {
    opacity: 1;
  }
`
export const Signup = styled.h2`
  font-size: 28px;
  opacity: ${({ action }) => (action === SIGN_UP ? '1' : '0.4')};
  cursor: default;

  :hover {
    opacity: 1;
  }
`
