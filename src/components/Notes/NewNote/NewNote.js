import React, { useState } from 'react'
import { connect } from 'react-redux'

import { requestAddNote, requestUpdateNote } from '../../../store/actions/index'

import style from './NewNote.module.scss'

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(requestAddNote(note)),
  updateNote: note => dispatch(requestUpdateNote(note)),
})

const NewNote = props => {
  const {
    update,
    toggleEditMode,
    closeOptions,
    app: { theme, addingNote },
    addNote,
    updateNote,
  } = props

  const [category, setCategory] = useState(props.category || '')
  const [title, setTitle] = useState(props.title || '')
  const [content, setContent] = useState(props.content || '')

  const saveNoteLocallyHandler = event => {
    event.preventDefault()

    const note = {
      _id: props._id,
      category: category.trim(),
      title: title.trim(),
      content,
    }

    if (update) {
      updateNote(note)
      toggleEditMode()
      closeOptions()
    } else {
      addNote(note)

      setCategory('')
      setTitle('')
      setContent('')
    }
  }

  const saveNoteOnCloudHandler = event => {
    event.preventDefault()

    if (update) {
      updateNote({ _id: props._id, category, title, content })
      toggleEditMode()
      closeOptions()
    } else {
      addNote({ category, title, content })

      setCategory('')
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className={`${style.note} ${addingNote ? style.saving : ''}`}>
      <form onSubmit={props.user.name ? saveNoteOnCloudHandler : saveNoteLocallyHandler} autoComplete="off">
        <div className={style.categoryBackground}>&nbsp;</div>
        <input
          className={style.category}
          type="text"
          value={category.toUpperCase()}
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
