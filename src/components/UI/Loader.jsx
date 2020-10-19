import React from 'react'
import styled from 'styled-components'

const StyledSpinner = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  border-top: 3px solid rgba(30, 144, 255, 0.5);
  border-right: 3px solid transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`

export default () => <StyledSpinner />
