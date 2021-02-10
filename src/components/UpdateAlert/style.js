import styled from 'styled-components'

export const Wrapper = styled.button`
  z-index: 1;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 16px 0;
  border: none;
  outline: none;
  color: #f0f6fc;
  background-color: black;
  animation: showUpdateAlert 0.5s;

  &:hover {
    color: #787878;
  }

  @keyframes showUpdateAlert {
    from {
      height: 0;
      padding: 0;
      opacity: 0;
    }
  }
`
