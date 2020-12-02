import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { userState } from 'atoms'
import { notesSelector } from 'selectors'
import { UPDATE_DEBOUNCE_IN_SECONDS } from './constants'
import If from 'components/If'
import Options from 'components/Options'
import { Wrapper, Category, Title, Content, ConfirmMessage, StyledDate } from './style'

const Note = ({ _id: noteID, category: noteCategory, title: noteTitle, content: noteContent, date: noteDate }) => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)

  const [category, setCategory] = useState(noteCategory)
  const [title, setTitle] = useState(noteTitle)
  const [content, setContent] = useState(noteContent)
  const [date, setDate] = useState(noteDate)
  const [editMode, setEditMode] = useState(false)
  const [optionsAreVisible, setOptionsAreVisible] = useState(false)
  const [confirmMessageIsVisible, setConfirmMessageIsVisible] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const updateNote = async () => {
      const note = {
        _id: noteID,
        category: category.trim(),
        title: title.trim(),
        content
      }
      let updatedNote

      if (user.name) {
        updatedNote = (await ws.json({ type: 'updateNote', updatedNote: note })).updatedNote
      } else {
        updatedNote = { ...note, date: Date.now() }
        localStorage.setItem(
          'notes',
          JSON.stringify(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
        )
      }

      setDate(Date.now())
    }

    if (noteCategory !== category || noteTitle !== title || noteContent !== content) {
      const updateTimeoutID = setTimeout(updateNote, UPDATE_DEBOUNCE_IN_SECONDS * 1000)

      return () => clearTimeout(updateTimeoutID)
    }
  }, [noteID, noteCategory, noteContent, noteTitle, notes, setNotes, user.name, category, title, content])

  const deleteNote = async () => {
    if (user.name) {
      setDeleting(true)

      const { status } = await ws.json({ type: 'deleteNote', noteID })

      if (status === 'SUCCESS') return setNotes(notes.filter(({ _id }) => _id !== noteID))
    }

    localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.notes).filter(({ _id }) => _id !== noteID)))
    setNotes(notes.filter(({ _id }) => _id !== noteID))
  }

  return (
    <Wrapper
      deleting={deleting}
      onClick={() => setEditMode(true)}
      onMouseMove={() => setOptionsAreVisible(true)}
      onMouseLeave={() => {
        setOptionsAreVisible(confirmMessageIsVisible)
        setEditMode(false)
      }}
    >
      <If condition={category || editMode}>
        <Category
          value={category}
          dir="auto"
          placeholder="CATEGORY"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))}
        />
      </If>

      <If condition={title || editMode}>
        <Title value={title} dir="auto" placeholder="Title" onChange={event => setTitle(event.target.value)} />
      </If>

      <Content value={content} dir="auto" onChange={event => setContent(event.target.value)} />

      <If condition={optionsAreVisible}>
        <Options onDelete={deleteNote} toggleConfirmMessage={mode => setConfirmMessageIsVisible(mode)} />
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
