import { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocketConnection'
import { userState } from 'atoms'
import { notesSelector } from 'selectors'
import Options from 'components/Options'
import NewNote from 'components/NewNote'
import { Wrapper, Category, Title, Content, ConfirmMessage, StyledDate } from './style'

const Note = props => {
  const { _id: noteID, category, title, content, date, modifyNote } = props

  const { updatingNoteID, deletingNoteID } = useSelector(
    ({ app: { updatingNoteID, deletingNoteID } }) => ({ updatingNoteID, deletingNoteID }),
    shallowEqual,
  )

  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)

  const [showOptions, setShowOptions] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

  const deleteNote = async () => {
    if (user.name) {
      // dispatch({ type: DELETING_NOTE, noteID })

      const { status } = await ws.json({ type: 'deleteNote', noteID })

      if (status === 'SUCCESS') setNotes(notes.filter(({ _id }) => _id !== noteID))
      return
    }

    localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.notes).filter(({ _id }) => _id !== noteID)))
    setNotes(notes.filter(({ _id }) => _id !== noteID))

    // dispatch({ type: DELETING_NOTE, noteID: '' })

    // dispatch({ type: ERROR, errorMessage: 'Error deleting note' })
  }

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
      isBeingModified={updatingNoteID === noteID || deletingNoteID === noteID}
      onMouseMove={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(showConfirmMessage)}
    >
      {category && <Category dir="auto">{category}</Category>}

      {title && <Title dir="auto">{title}</Title>}

      <Content dir="auto">{content}</Content>

      {showOptions && (
        <Options
          onEdit={() => setEditMode(!editMode)}
          onDelete={deleteNote}
          toggleConfirmMessage={mode => setShowConfirmMessage(mode)}
        />
      )}

      {showConfirmMessage && updatingNoteID !== noteID && deletingNoteID !== noteID ? (
        <ConfirmMessage>Delete this note?</ConfirmMessage>
      ) : (
        <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
      )}
    </Wrapper>
  )
}

export default Note
