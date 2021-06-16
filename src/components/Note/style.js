import styled from 'styled-components'

import { VIEWPORT_4, NOT_MOBILE } from 'media-queries'

import Pin from 'images/pin.svg'

export const Wrapper = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 250px;
  margin: 10px 0;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: var(--primary-color);
  opacity: ${({ faded }) => (faded ? '0.5' : '1')};
  pointer-events: ${({ faded }) => (faded ? 'none' : 'auto')};
  animation: showNote 0.25s;

  @keyframes showNote {
    from {
      opacity: 0;
    }
  }

  @media ${VIEWPORT_4} {
    width: 400px;
    margin: 20px;
  }
`
export const PinIcon = styled(Pin)`
  position: absolute;
  top: 2.5px;
  right: 3px;
  width: 14px;
  height: 14px;
  color: ${({ pinned }) => (pinned ? 'auto' : 'var(--placeholder-color)')};
  cursor: pointer;
  animation: showPin 0.25s;

  @keyframes showPin {
    from {
      opacity: 0;
    }
  }
`
export const Save = styled.input`
  z-index: 1;
  margin: 0 auto;
  padding: 3.75px 20px;
  border: none;
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
  text-align: center;
  color: inherit;
  background-color: var(--secondary-color);
  font-size: 12px;
  font-weight: 500;
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
  cursor: pointer;

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 0.75;
    }
  }
`
