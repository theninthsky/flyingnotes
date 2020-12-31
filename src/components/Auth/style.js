import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 30vw;
  height: 50vh;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 2px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  background-color: var(--primary-color);
  animation: showAuth 0.5s;

  @keyframes showAuth {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 90vw;
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
  font-size: 16px;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px white inset;
  }
`
export const Submit = styled(Input)`
  margin-top: 10%;
  padding: 6px 8px;
  border: 1px solid var(--secondary-color);
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
