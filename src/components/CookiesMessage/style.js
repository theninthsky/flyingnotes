import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 2%;
  left: 25vw;
  width: 45vw;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid var(--secondary-color);
  box-sizing: border-box;
  text-align: center;
  background-color: var(--primary-color);
  cursor: pointer;
  user-select: none;
  animation: showMessage 8s;

  @media (max-width: 768px) {
    width: 75vw;
    left: 12.5vw;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    left: 2.5vw;
  }

  @keyframes showMessage {
    0% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
