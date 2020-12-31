import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 40vw;
  height: 60vh;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 2px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  background-color: var(--primary-color);
  animation: showUser 0.5s;

  @keyframes showUser {
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
export const Input = styled.input`
  display: block;
  margin: 1vh auto;
  padding: 4px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
  font-size: 16px;

  &:-webkit-autofill {
    box-shadow: 0 0 0 100px white inset;
  }
`
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
