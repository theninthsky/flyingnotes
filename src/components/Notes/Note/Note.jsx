import { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import Options from '../../Options'
import NewNote from '../NewNote'
import { Wrapper, Category, Title, Content, ConfirmMessage, StyledDate } from './style'

const Note = props => {
  const { _id, category, title, content, date, modifyNote } = props

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
      modifyNote={modifyNote}
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
