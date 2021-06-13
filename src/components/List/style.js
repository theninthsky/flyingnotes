import styled from 'styled-components'

import {
  Wrapper as NoteWrapper,
  PinIcon as NotePin,
  Title as NoteTitle,
  Content as NoteContent,
  ConfirmMessage as NoteConfirmMessage,
  StyledDate as NoteDate,
  Save as NoteSave
} from 'components/Note/style'

import Checked from 'images/checked.svg'
import Unchecked from 'images/unchecked.svg'

export const Wrapper = styled(NoteWrapper)`
  max-height: 350px;
`
export const PinIcon = styled(NotePin)``

export const Title = styled(NoteTitle)``

export const Content = styled(NoteContent)`
  min-height: 100px;
  margin: 6px 15px;
  overflow: auto;
`
export const CheckedIcon = styled(Checked)`
  width: 20px;
  margin-top: 10px;
  cursor: pointer;
`
export const UncheckedIcon = styled(Unchecked)`
  width: 20px;
  margin-top: 10px;
  cursor: pointer;
`
export const Value = styled.input`
  display: block;
  width: 85%;
  margin: 10px;
  border: none;
  border-bottom: 1px solid var(--secondary-color);
  outline: none;
  color: inherit;
  background-color: inherit;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`
export const ConfirmMessage = styled(NoteConfirmMessage)``

export const StyledDate = styled(NoteDate)``

export const Save = styled(NoteSave)``
