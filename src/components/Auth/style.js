import styled from 'styled-components'

import { VIEWPORT_4 } from 'media-queries'

export const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 10px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  box-sizing: border-box;
  background-color: var(--primary-color);
  animation: showAuth 0.25s;

  @keyframes showAuth {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media ${VIEWPORT_4} {
    width: 420px;
  }
`
export const Title = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: center;

  h1 {
    font-weight: normal;
    cursor: pointer;
  }
`
export const Login = styled.h1`
  opacity: ${({ action }) => (action === 'Login' ? '1' : '0.4')};

  &:hover {
    opacity: 1;
  }
`
export const Divider = styled.div`
  margin-top: 5%;
  height: 50px;
  border: 0.5px solid rgb(128, 128, 128);
`
export const Register = styled.h1`
  opacity: ${({ action }) => (action === 'Register' ? '1' : '0.4')};

  &:hover {
    opacity: 1;
  }
`
export const ErrorMessage = styled.p`
  margin-bottom: 10%;
  text-align: center;
  color: red;
`
export const LoginMessage = styled.p`
  margin-bottom: 10%;
  text-align: center;
`
export const Input = styled.input`
  display: block;
  margin: 1vh auto;
  padding: 4px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
  color: var(--text-color);
  background-color: var(--primary-color);

  &::placeholder {
    color: var(--placeholder-color);
  }
`
export const Submit = styled(Input)`
  margin-top: 30px;
  padding: 6px 8px;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  color: inherit;
  background-color: var(--secondary-color);
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
