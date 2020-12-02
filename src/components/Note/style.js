import styled from 'styled-components'

import { Category as NewNoteCategory, Title as NewNoteTitle } from 'components/NewNote/style'

export const Wrapper = styled.div`
  position: relative;
  margin: 15px;
  min-width: 200px;
  max-width: 400px;
  min-height: 125px;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ deleting }) => (deleting ? '0.5' : '1')};
  transition: 0.2s;
  animation: showNote 0.5s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes showNote {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: none;
    min-height: 100px;
    max-height: 250px;
    margin: 10px 0;
  }
`
export const Category = styled(NewNoteCategory)`
  width: auto;
`
export const Title = styled(NewNoteTitle)`
  width: auto;
`
export const Content = styled.textarea`
  position: relative;
  flex-grow: 1;
  margin: 10px 12px 2.5px 12px;
  border: none;
  outline: none;
  resize: none;
  white-space: pre;
  overflow: auto;
  font-size: 16px;

  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-thumb {
    visibility: hidden;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }

  @media (min-width: 480px) {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: #999;
    }
  }
`
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
