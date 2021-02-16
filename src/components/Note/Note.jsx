import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { userState, notesState } from 'atoms'
import { RTL_REGEX, EMPTY_IMAGE } from 'global-constants'
import { CATEGORY, TITLE, SAVE, DELETE_MESSAGE } from './constants'
import { If, Options } from 'components'
import { Wrapper, Pin, Category, Title, Content, ConfirmMessage, StyledDate, Save } from './style'

const Note = ({
  newNote,
  _id: noteID,
  pinned = false,
  category: noteCategory = '',
  title: noteTitle = '',
  content: noteContent = '',
  date
}) => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesState)

  const [category, setCategory] = useState(noteCategory)
  const [title, setTitle] = useState(noteTitle)
  const [content, setContent] = useState(noteContent)
  const [editMode, setEditMode] = useState(false)
  const [optionsAreVisible, setOptionsAreVisible] = useState(false)
  const [confirmMessageIsVisible, setConfirmMessageIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCategory(noteCategory)
    setTitle(noteTitle)
    setContent(noteContent)
  }, [noteCategory, noteTitle, noteContent])

  const resetNote = () => {
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

      if (!savedNote) return

      localStorage.setItem('userNotes', JSON.stringify([...notes, savedNote]))
    } else {
      savedNote = { ...note, _id: Date.now(), date: Date.now() }
      localStorage.setItem('notes', JSON.stringify([...notes, savedNote]))
    }

    setLoading(false)
    setNotes([...notes, savedNote])
    resetNote()
  }

  const updatePin = async event => {
    event.stopPropagation()

    if (user.name) {
      const { status } = await ws.json({ type: 'updateNotePin', noteID, pinned: !pinned })

      if (status !== 'SUCCESS') return

      localStorage.setItem(
        'userNotes',
        JSON.stringify(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
      )
    } else {
      localStorage.setItem(
        'notes',
        JSON.stringify(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
      )
    }

    setNotes(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
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
    setNotes(notes.map(originalNote => (originalNote._id === noteID ? { ...note, date } : originalNote)))
  }

  const deleteNote = async () => {
    if (user.name) {
      setLoading(true)

      const { status } = await ws.json({ type: 'deleteNote', noteID })

      if (status !== 'SUCCESS') return

      localStorage.setItem('userNotes', JSON.stringify(notes.filter(({ _id }) => _id !== noteID)))
    } else {
      localStorage.setItem('notes', JSON.stringify(notes.filter(({ _id }) => _id !== noteID)))
    }

    setNotes(notes.filter(({ _id }) => _id !== noteID))
  }

  const noteChanged = category !== noteCategory || title !== noteTitle || content !== noteContent

  return (
    <Wrapper
      faded={loading}
      autoComplete="off"
      onClick={() => {
        if (!newNote) setOptionsAreVisible(true)
      }}
      onMouseLeave={() => {
        setOptionsAreVisible(confirmMessageIsVisible)
        setEditMode(false)
      }}
      onSubmit={newNote ? createNote : updateNote}
    >
      <Pin pinned={pinned} src={EMPTY_IMAGE} onClick={updatePin} />

      <If condition={category || newNote || editMode}>
        <Category
          value={category}
          dir="auto"
          placeholder={CATEGORY}
          aria-label="category"
          onClick={() => setEditMode(true)}
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))}
        />
      </If>

      <If condition={title || newNote || editMode}>
        <Title
          value={title}
          dir="auto"
          placeholder={TITLE}
          aria-label="title"
          onClick={() => setEditMode(true)}
          onChange={event => setTitle(event.target.value)}
        />
      </If>

      <Content
        height={`${(content.match(/\n/g) || []).length * 15 + 45}px`}
        dir={RTL_REGEX.test(content) ? 'rtl' : 'ltr'}
        value={content}
        aria-label="content"
        required
        onClick={() => setEditMode(true)}
        onChange={event => setContent(event.target.value)}
      />

      <If condition={optionsAreVisible}>
        <Options onDelete={deleteNote} toggleConfirmMessage={mode => setConfirmMessageIsVisible(mode)} />
      </If>

      {confirmMessageIsVisible ? (
        <ConfirmMessage>{DELETE_MESSAGE}</ConfirmMessage>
      ) : noteChanged || newNote ? (
        <Save hidden={!noteChanged && !newNote} type="submit" value={SAVE} aria-label="save" />
      ) : (
        <If condition={!newNote}>
          <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
        </If>
      )}
    </Wrapper>
  )
}

export default Note
