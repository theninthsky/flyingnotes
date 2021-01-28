import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { userState, notesState } from 'atoms'
import { CATEGORY, TITLE, SAVE, UPDATE_DEBOUNCE } from './constants'
import If from 'components/If'
import Options from 'components/Options'
import { Wrapper, Category, Title, Content, ConfirmMessage, StyledDate, Save } from './style'

const Note = ({
  newNote,
  _id: noteID,
  category: noteCategory = '',
  title: noteTitle = '',
  content: noteContent = '',
  date: noteDate
}) => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesState)

  const [category, setCategory] = useState(noteCategory)
  const [title, setTitle] = useState(noteTitle)
  const [content, setContent] = useState(noteContent)
  const [date, setDate] = useState(noteDate)
  const [editMode, setEditMode] = useState(false)
  const [optionsAreVisible, setOptionsAreVisible] = useState(false)
  const [confirmMessageIsVisible, setConfirmMessageIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (newNote) return

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
        localStorage.setItem(
          'userNotes',
          JSON.stringify(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
        )
      } else {
        updatedNote = { ...note, date: Date.now() }
        localStorage.setItem(
          'notes',
          JSON.stringify(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
        )
      }

      const date = Date.now()

      setDate(date)
      setNotes(notes.map(originalNote => (originalNote._id === noteID ? { ...note, date } : originalNote)))
    }

    if (noteCategory !== category || noteTitle !== title || noteContent !== content) {
      const updateTimeout = setTimeout(updateNote, UPDATE_DEBOUNCE)

      return () => clearTimeout(updateTimeout)
    }
  }, [newNote, noteID, noteCategory, noteContent, noteTitle, notes, setNotes, user.name, category, title, content])

  const resetNote = () => {
    setCategory('')
    setTitle('')
    setContent('')
  }

  const createNote = async event => {
    event.preventDefault()

    const note = {
      category: category.trim(),
      title: title.trim(),
      content
    }
    let savedNote

    setLoading(true)

    if (user.name) {
      savedNote = (await ws.json({ type: 'createNote', newNote: note })).newNote
      localStorage.setItem('userNotes', JSON.stringify([...notes, savedNote]))
    } else {
      savedNote = { ...note, _id: Date.now(), date: Date.now() }
      localStorage.setItem('notes', JSON.stringify([...notes, savedNote]))
    }

    setLoading(false)
    setNotes([...notes, savedNote])
    resetNote()
  }

  const deleteNote = async () => {
    if (user.name) {
      setLoading(true)

      const { status } = await ws.json({ type: 'deleteNote', noteID })

      if (status === 'SUCCESS') {
        setNotes(notes.filter(({ _id }) => _id !== noteID))
        localStorage.setItem('userNotes', JSON.stringify(notes.filter(({ _id }) => _id !== noteID)))
      }
    } else {
      localStorage.setItem('notes', JSON.stringify(notes.filter(({ _id }) => _id !== noteID)))
    }

    setNotes(notes.filter(({ _id }) => _id !== noteID))
  }

  return (
    <Wrapper
      faded={loading}
      autoComplete="off"
      onClick={() => setEditMode(true)}
      onMouseMove={() => {
        if (!newNote) setOptionsAreVisible(true)
      }}
      onMouseLeave={() => {
        setOptionsAreVisible(confirmMessageIsVisible)
        setEditMode(false)
      }}
      onSubmit={createNote}
    >
      <If condition={category || newNote || editMode}>
        <Category
          value={category}
          dir="auto"
          placeholder={CATEGORY}
          aria-label="category"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))}
        />
      </If>

      <If condition={title || newNote || editMode}>
        <Title
          value={title}
          dir="auto"
          placeholder={TITLE}
          aria-label="title"
          onChange={event => setTitle(event.target.value)}
        />
      </If>

      <Content
        height={`${(content.match(/\n/g) || []).length * 15 + 45}px`}
        dir={/^[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(content) ? 'rtl' : 'ltr'}
        value={content}
        aria-label="content"
        required
        onChange={event => setContent(event.target.value)}
      />

      <If condition={optionsAreVisible}>
        <Options onDelete={deleteNote} toggleConfirmMessage={mode => setConfirmMessageIsVisible(mode)} />
      </If>

      {newNote ? (
        <Save type="submit" value={SAVE} aria-label="save" />
      ) : confirmMessageIsVisible ? (
        <ConfirmMessage>Delete this note?</ConfirmMessage>
      ) : (
        <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
      )}
    </Wrapper>
  )
}

export default Note
