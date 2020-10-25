import { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import Options from '../../Options'
import NewNote from '../NewNote'

// #region Styles
const Wrapper = styled.div`
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
  opacity: ${({ isBeingModified }) => (isBeingModified ? '0.5' : '1')};
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
const Category = styled.div`
  padding: 2px 0;
  border-radius: 4px 4px 0 0;
  width: 100%;
  text-align: center;
  letter-spacing: 3px;
  font-size: 12px;
  color: rgb(150, 150, 150);
  background-color: #ffffde;
`
const Title = styled.h1`
  margin: 10px auto;
  margin-bottom: 0;
  width: 94%;
  text-align: center;
  line-height: 0.95;
  font-size: 24px;
  font-weight: normal;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`
const Content = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 10px 12px 2.5px 12px;
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
const ConfirmMessage = styled.div`
  padding: 2.5px 0;
  text-align: center;
  font-size: 14px;
  color: inherit;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`
const StyledDate = styled.div`
  padding: 2.5px 0;
  text-align: center;
  font-size: 14px;
  color: rgb(160, 160, 160);

  @media (max-width: 480px) {
    font-size: 12px;
  }
`
// #endregion

const Note = props => {
  const { _id, category, title, content, date } = props

  const { updatingNoteID, deletingNoteID } = useSelector(
    ({ app: { updatingNoteID, deletingNoteID } }) => ({ updatingNoteID, deletingNoteID }),
    shallowEqual,
  )

  const [showOptions, setShowOptions] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

  return editMode ? (
    <NewNote
      {...props}
      toggleEditMode={() => setEditMode(!editMode)}
      closeOptions={() => setShowOptions(showConfirmMessage)}
      updateMode
    />
  ) : (
    <Wrapper
      isBeingModified={updatingNoteID === _id || deletingNoteID === _id}
      onMouseMove={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(showConfirmMessage)}
    >
      {category && <Category dir="auto">{category}</Category>}

      {title && <Title dir="auto">{title}</Title>}

      <Content dir="auto">{content}</Content>

      {showOptions && (
        <Options
          id={_id}
          onEdit={() => setEditMode(!editMode)}
          toggleConfirmMessage={mode => setShowConfirmMessage(mode)}
        />
      )}

      {showConfirmMessage && updatingNoteID !== _id && deletingNoteID !== _id ? (
        <ConfirmMessage>Delete this note?</ConfirmMessage>
      ) : (
        <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
      )}
    </Wrapper>
  )
}

export default Note
