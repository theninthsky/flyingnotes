import styled from 'styled-components'

export const Wrapper = styled.button`
  z-index: 1;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 14px 0;
  border: none;
  outline: none;
  color: #f0f6fc;
  background-color: black;
  animation: showUpdateAlert 0.5s;

  &:hover {
    opacity: 0.5;
  }

  @keyframes showUpdateAlert {
    from {
      height: 0;
      padding: 0;
      opacity: 0;
    }
  }
`
