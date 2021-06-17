import { useState, useEffect, useRef } from 'react'
import { bool, string, func } from 'prop-types'
import useClickOutside from 'use-click-outside'
import cx from 'clsx'

import { CATEGORY, TITLE, SAVE, DELETE_MESSAGE, RTL_REGEX } from './constants'
import If from 'components/If'
import Options from 'components/Options'

import style from './Note.scss'
import PinIcon from 'images/pin.svg'

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
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [confirmMessageVisible, setConfirmMessageVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const noteRef = useRef()

  useEffect(() => {
    setCategory(noteCategory)
    setTitle(noteTitle)
    setContent(noteContent)
  }, [noteCategory, noteTitle, noteContent])

  useClickOutside(noteRef, () => {
    setOptionsVisible(false)
    setConfirmMessageVisible(false)
    setEditMode(false)
  })

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
      setOptionsVisible(false)
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
    <form
      className={cx(style.wrapper, { [style.disabled]: loading })}
      ref={noteRef}
      autoComplete="off"
      onClick={() => {
        if (!newNote) setOptionsVisible(true)
      }}
      onSubmit={saveNote}
    >
      <If condition={!newNote}>
        <PinIcon className={cx(style.pinIcon, { [style.pinned]: pinned })} onClick={updatePin} />
      </If>

      <If condition={category || newNote || editMode}>
        <input
          className={style.category}
          value={category}
          dir="auto"
          placeholder={CATEGORY}
          aria-label="category"
          onClick={() => setEditMode(true)}
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))}
        />
      </If>

      <If condition={title || newNote || editMode}>
        <input
          className={style.title}
          value={title}
          dir="auto"
          placeholder={TITLE}
          aria-label="title"
          onClick={() => setEditMode(true)}
          onChange={event => setTitle(event.target.value)}
        />
      </If>

      <textarea
        className={style.content}
        rows={(content.match(/\n/g) || []).length}
        dir={RTL_REGEX.test(content) ? 'rtl' : 'ltr'}
        value={content}
        aria-label="content"
        required
        onClick={() => setEditMode(true)}
        onChange={event => setContent(event.target.value)}
      />

      <If condition={optionsVisible}>
        <Options onDelete={deleteNote} setConfirmMessage={setConfirmMessageVisible} />
      </If>

      {confirmMessageVisible ? (
        <div className={style.confirmMessage}>{DELETE_MESSAGE}</div>
      ) : noteChanged || newNote ? (
        <input
          className={cx(style.save, { [style.hidden]: !noteChanged && !newNote })}
          type="submit"
          value={SAVE}
          aria-label="save"
        />
      ) : (
        <If condition={!newNote}>
          <div className={style.date}>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</div>
        </If>
      )}
    </form>
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
