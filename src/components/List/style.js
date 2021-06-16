import styled from 'styled-components'

import { Wrapper as NoteWrapper, PinIcon as NotePin, Save as NoteSave } from 'components/Note/style'

export const Wrapper = styled(NoteWrapper)`
  max-height: 350px;
`
export const PinIcon = styled(NotePin)``

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
export const Save = styled(NoteSave)``
