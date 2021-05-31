import { useState, useEffect } from 'react'
import { bool, string, func } from 'prop-types'

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
  date,
  onCreateNote,
  onUpdatePin,
  onUpdateNote,
  onDeleteNote
}) => {
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

  const saveNote = async event => {
    event.preventDefault()

    const note = {
      pinned,
      category: category.trim(),
      title: title.trim(),
      content: content.trim()
    }

    setLoading(true)

    if (newNote) {
      await onCreateNote(note)
      resetNote()
    } else {
      note._id = noteID

      await onUpdateNote(note)
      setEditMode(false)
      setOptionsAreVisible(false)
    }

    setLoading(false)
  }

  const updatePin = async event => {
    event.stopPropagation()

    onUpdatePin(noteID, pinned)
  }

  const deleteNote = async () => {
    setLoading(true)
    onDeleteNote(noteID)
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
      onSubmit={saveNote}
    >
      <If condition={!newNote}>
        <Pin pinned={pinned} src={EMPTY_IMAGE} onClick={updatePin} />
      </If>

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

Note.propTypes = {
  newNote: bool,
  _id: string,
  pinned: bool,
  category: string,
  title: string,
  content: string,
  date: string,
  onCreateNote: func,
  onUpdatePin: func,
  onUpdateNote: func,
  onDeleteNote: func
}

export default Note
