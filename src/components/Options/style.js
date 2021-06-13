import styled from 'styled-components'

import { NOT_MOBILE } from 'media-queries'

import Delete from 'images/delete.svg'
import Confirm from 'images/confirm.svg'
import Cancel from 'images/cancel.svg'

export const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 21px;
  border-radius: 4px 4px 0 0;
  background-color: transparent;
  animation: showOptions 0.25s;

  @keyframes showOptions {
    from {
      opacity: 0;
    }
  }
`
export const ConfirmIcon = styled(Confirm)`
  position: absolute;
  bottom: 6px;
  left: 10px;
  height: 75%;
  cursor: pointer;

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 0.5;
    }
  }
`
export const CancelIcon = styled(Cancel)`
  position: absolute;
  bottom: 6px;
  right: 10px;
  height: 75%;
  cursor: pointer;

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 0.5;
    }
  }
`
export const DeleteIcon = styled(Delete)`
  position: absolute;
  bottom: 5px;
  left: 12px;
  height: 75%;
  cursor: pointer;

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 0.5;
    }
  }
`
