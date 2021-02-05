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
`
export const Item = styled.div`
  display: flex;
  opacity: ${({ faded }) => (faded ? '0.5' : '1')};
`
export const Checked = styled.img`
  width: 14px;
  margin-right: 20px;
`
export const Value = styled.input`
  display: block;
  width: 96%;
  margin: 10px auto;
  border: none;
  border-bottom: 1px solid var(--secondary-color);
  outline: none;
  color: inherit;
  background-color: inherit;
`
export const ConfirmMessage = styled(NoteConfirmMessage)``

export const StyledDate = styled(NoteDate)``

export const Save = styled(NoteSave)``
