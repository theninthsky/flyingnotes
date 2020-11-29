import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocketConnection'
import { userState } from 'atoms'
import { notesSelector } from 'selectors'
import If from 'components/If'
import Options from 'components/Options'
import NewNote from 'components/NewNote'
import { Wrapper, Category, Title, Content, ConfirmMessage, StyledDate } from './style'

const Note = props => {
  const { _id: noteID, category, title, content, date, modifyNote } = props

  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)

  const [optionsAreVisible, setOptionsAreVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [confirmMessageIsVisible, setConfirmMessageIsVisible] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const deleteNote = async () => {
    if (user.name) {
      setDeleting(true)

      const { status } = await ws.json({ type: 'deleteNote', noteID })

      if (status === 'SUCCESS') return setNotes(notes.filter(({ _id }) => _id !== noteID))
    }

    localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.notes).filter(({ _id }) => _id !== noteID)))
    setNotes(notes.filter(({ _id }) => _id !== noteID))
  }

  return editMode ? (
    <NewNote
      {...props}
      toggleEditMode={() => setEditMode(!editMode)}
      closeOptions={() => setOptionsAreVisible(confirmMessageIsVisible)}
      updateMode
      modifyNote={modifyNote}
    />
  ) : (
    <Wrapper
      deleting={deleting}
      onMouseMove={() => setOptionsAreVisible(true)}
      onMouseLeave={() => setOptionsAreVisible(confirmMessageIsVisible)}
    >
      <If condition={category}>
        <Category dir="auto">{category}</Category>
      </If>

      <If condition={title}>
        <Title dir="auto">{title}</Title>
      </If>

      <Content dir="auto">{content}</Content>

      <If condition={optionsAreVisible}>
        <Options
          onEdit={() => setEditMode(!editMode)}
          onDelete={deleteNote}
          toggleConfirmMessage={mode => setConfirmMessageIsVisible(mode)}
        />
      </If>

      {confirmMessageIsVisible ? (
        <ConfirmMessage>Delete this note?</ConfirmMessage>
      ) : (
        <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
      )}
    </Wrapper>
  )
}

export default Note
