import styled from 'styled-components'

import { VIEWPORT_4 } from 'media-queries'

export const Wrapper = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 25px;
  left: 0;
  right: 0;
  width: 90vw;
  margin: auto;
  padding: 10px;
  border: 1px solid var(--secondary-color);
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  background-color: var(--primary-color);
  cursor: pointer;
  user-select: none;
  animation: showMessage 8s;

  @media ${VIEWPORT_4} {
    width: 75vw;
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
