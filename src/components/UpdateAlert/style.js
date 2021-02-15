import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
  width: 100%;
  max-height: 48px;
  padding: 15px 0;
  overflow: hidden;
  text-align: center;
  color: #f0f6fc;
  background-color: black;
  user-select: none;
  animation: showUpdateAlert 0.5s linear;

  &:hover {
    color: #787878;
  }

  @keyframes showUpdateAlert {
    from {
      max-height: 0;
      padding: 0;
    }
  }
`
