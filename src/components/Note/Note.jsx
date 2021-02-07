import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { userState, notesState } from 'atoms'
import { RTL_REGEX, EMPTY_IMAGE } from 'global-constants'
import { CATEGORY, TITLE, SAVE, DELETE_MESSAGE } from './constants'
import If from 'components/If'
import Options from 'components/Options'
import { Wrapper, Pin, Category, Title, Content, ConfirmMessage, StyledDate, Save } from './style'

const Note = ({
  newNote,
  _id: noteID,
  pinned: noteIsPinned = false,
  category: noteCategory = '',
  title: noteTitle = '',
  content: noteContent = '',
  date: noteDate
}) => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesState)

  const [pinned, setPinned] = useState(noteIsPinned)
  const [category, setCategory] = useState(noteCategory)
  const [title, setTitle] = useState(noteTitle)
  const [content, setContent] = useState(noteContent)
  const [date, setDate] = useState(noteDate)
  const [editMode, setEditMode] = useState(false)
  const [optionsAreVisible, setOptionsAreVisible] = useState(false)
  const [confirmMessageIsVisible, setConfirmMessageIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPinned(noteIsPinned)
    setCategory(noteCategory)
    setTitle(noteTitle)
    setContent(noteContent)
    setDate(noteDate)
  }, [noteIsPinned, noteCategory, noteTitle, noteContent, noteDate])

  const resetNote = () => {
    setPinned(false)
    setCategory('')
    setTitle('')
    setContent('')
  }

  const createNote = async event => {
    event.preventDefault()

    const note = {
      pinned,
      category: category.trim(),
      title: title.trim(),
      content: content.trim()
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

  const updateNote = async event => {
    event.preventDefault()

    const note = {
      _id: noteID,
      pinned,
      category: category.trim(),
      title: title.trim(),
      content: content.trim()
    }
    let updatedNote

    if (user.name) {
      setLoading(true)

      updatedNote = (await ws.json({ type: 'updateNote', updatedNote: note })).updatedNote
      localStorage.setItem(
        'userNotes',
        JSON.stringify(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
      )

      setLoading(false)
    } else {
      updatedNote = { ...note, date: Date.now() }
      localStorage.setItem(
        'notes',
        JSON.stringify(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
      )
    }

    const date = Date.now()

    setEditMode(false)
    setOptionsAreVisible(false)
    setDate(date)
    setNotes(notes.map(originalNote => (originalNote._id === noteID ? { ...note, date } : originalNote)))
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
      focused={editMode}
      autoComplete="off"
      onClick={() => {
        if (!newNote) setOptionsAreVisible(true)
        setEditMode(true)
      }}
      onMouseLeave={() => {
        setOptionsAreVisible(confirmMessageIsVisible)
        setEditMode(false)
      }}
      onSubmit={newNote ? createNote : updateNote}
    >
      <If condition={newNote || pinned || optionsAreVisible}>
        <Pin pinned={pinned} src={EMPTY_IMAGE} onClick={() => setPinned(!pinned)} />
      </If>

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
        clipped={pinned && !category && !title}
        dir={RTL_REGEX.test(content) ? 'rtl' : 'ltr'}
        value={content}
        aria-label="content"
        required
        onChange={event => setContent(event.target.value)}
      />

      <If condition={optionsAreVisible}>
        <Options onDelete={deleteNote} toggleConfirmMessage={mode => setConfirmMessageIsVisible(mode)} />
      </If>

      {confirmMessageIsVisible ? (
        <ConfirmMessage>{DELETE_MESSAGE}</ConfirmMessage>
      ) : newNote || editMode ? (
        <Save type="submit" value={SAVE} aria-label="save" />
      ) : (
        <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
      )}
    </Wrapper>
  )
}

export default Note
