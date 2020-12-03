import styled from 'styled-components'

import {
  Wrapper as NewNoteWrapper,
  Category as NewNoteCategory,
  Title as NewNoteTitle,
  Content as NewNoteContent
} from 'components/NewNote/style'

export const Wrapper = styled(NewNoteWrapper)`
  opacity: ${({ deleting }) => (deleting ? '0.5' : '1')};
`
export const Category = styled(NewNoteCategory)``

export const Title = styled(NewNoteTitle)``

export const Content = styled(NewNoteContent)``

export const ConfirmMessage = styled.div`
  padding: 2.5px 0;
  text-align: center;
  font-size: 14px;
  color: inherit;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`
export const StyledDate = styled.div`
  padding: 2.5px 0;
  text-align: center;
  font-size: 14px;
  color: rgb(160, 160, 160);

  @media (max-width: 480px) {
    font-size: 12px;
  }
`
