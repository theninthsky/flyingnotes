import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { addNote, updateNote } from '../../../store/actions/index'

import style from './NewNote.module.scss'

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(addNote(note)),
  updateNote: note => dispatch(updateNote(note)),
})

const NewNote = props => {
  const {
    updateMode,
    toggleEditMode,
    closeOptions,
    app: { theme, addingNote, updatingNote },
    addNote,
    updateNote,
  } = props

  const [category, setCategory] = useState(props.category || '')
  const [title, setTitle] = useState(props.title || '')
  const [content, setContent] = useState(props.content || '')

  useEffect(() => {
    if (updateMode || addingNote) return

    setCategory('')
    setTitle('')
    setContent('')
  }, [updateMode, addingNote])

  const saveNoteLocallyHandler = event => {
    event.preventDefault()

    const note = {
      _id: props._id,
      category: category.trim(),
      title: title.trim(),
      content,
    }

    if (!updateMode) return addNote(note)

    updateNote(note)
    toggleEditMode()
    closeOptions()
  }

  const saveNoteOnCloudHandler = event => {
    event.preventDefault()

    if (!updateMode) return addNote({ category, title, content })

    updateNote({ _id: props._id, category, title, content })
    toggleEditMode()
    closeOptions()
  }

  return (
    <div className={`${style.note} ${addingNote || updatingNote === props._id ? style.saving : ''}`}>
      <form onSubmit={props.user.name ? saveNoteOnCloudHandler : saveNoteLocallyHandler} autoComplete="off">
        <input
          className={style.category}
          type="text"
          value={category}
          dir="auto"
          placeholder="CATEGORY"
          maxLength="24"
          title="Optional"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))} // forces maxLength on mobile devices
        />

        <input
          className={`${style.title} ${theme === 'dark' ? style.titleDark : ''}`}
          type="text"
          dir="auto"
          placeholder="Title"
          value={title}
          title="Optional"
          maxLength="60"
          onChange={event => setTitle(event.target.value)}
        />

        <textarea
          className={style.content}
          dir="auto"
          value={content}
          title="Note's content"
          required
          onChange={event => setContent(event.target.value)}
        ></textarea>

        <input className={style.save} type="submit" value="SAVE" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
