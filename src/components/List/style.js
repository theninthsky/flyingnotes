import styled from 'styled-components'

import {
  Wrapper as NoteWrapper,
  Pin as NotePin,
  Title as NoteTitle,
  Content as NoteContent,
  ConfirmMessage as NoteConfirmMessage,
  StyledDate as NoteDate,
  Save as NoteSave
} from 'components/Note/style'

export const Wrapper = styled(NoteWrapper)`
  max-height: 350px;
`
export const Pin = styled(NotePin)``

export const Title = styled(NoteTitle)``

export const Content = styled(NoteContent)`
  min-height: 100px;
  overflow: auto;
`
export const Item = styled.div`
  display: flex;
`
export const Checked = styled.img`
  width: 20px;
  margin-top: 10px;
  background-image: ${({ checked }) => (checked ? `var(--item-checked-icon)` : `var(--item-unchecked-icon)`)};
  background-repeat: no-repeat;
  cursor: pointer;
`
export const Value = styled.input`
  display: block;
  width: 84%;
  margin: 10px;
  border: none;
  border-bottom: 1px solid var(--secondary-color);
  outline: none;
  color: inherit;
  background-color: inherit;
`
export const ConfirmMessage = styled(NoteConfirmMessage)``

export const StyledDate = styled(NoteDate)``

export const Save = styled(NoteSave)``
