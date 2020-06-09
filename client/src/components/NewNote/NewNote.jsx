import React, { useState } from 'react'
import { connect } from 'react-redux'
import { GithubPicker } from 'react-color'

import * as actions from '../../store/actions/index'
import NoteSpinner from '../UI/NoteSpinner'
import styles from './NewNote.module.scss'

import colorPaletteIcon from '../../assets/images/color-palette.svg'
import uploadIcon from '../../assets/images/upload.svg'

const colorsArray = [
  '#c0392b',
  '#d35400',
  '#f39c12',
  '#27ae60',
  '#2980b9',
  '#006B76',
  '#8e44ad',
  '#2c3e50',
  '#7f8c8d',
  '#bdc3c7',
]

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(actions.requestAddNote(note)),
  updateNote: note => dispatch(actions.requestUpdateNote(note)),
})

const NewNote = props => {
  const { update, toggleEditMode, closeOptions } = props
  const { theme, addingNote } = props.app
  const { addNote, updateNote } = props

  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color, setColor] = useState(props.color || colorsArray[~~(Math.random() * 10)])
  const [category, setCategory] = useState(props.category || '')
  const [title, setTitle] = useState(props.title || '')
  const [content, setContent] = useState(props.content || '')
  const [selectedFile, setSelectedFile] = useState()

  const colorHanlder = color => {
    setColor(color.hex)
    setShowColorPicker(false)
  }

  const fileHandler = event => {
    const [file] = event.target.files

    if (file) {
      if (file.size <= 1024 * 1024 * 10) {
        setSelectedFile(file)
      } else {
        alert('File size exceeds 10MB')
        setSelectedFile(null)
        document.querySelector('input[type="file"]').value = ''
      }
    } else {
      setSelectedFile(null)
    }
  }

  const saveNoteLocallyHandler = event => {
    event.preventDefault()

    const note = {
      _id: props._id,
      color,
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
      setColor(colorsArray[~~(Math.random() * 10)])
      setCategory('')
      setTitle('')
      setContent('')
    }
  }

  const saveNoteOnCloudHandler = event => {
    event.preventDefault()

    const data = new FormData()

    data.append('color', color)
    data.append('category', category.trim())
    data.append('title', title.trim())
    data.append('content', content)

    if (selectedFile) {
      data.append('file', selectedFile, selectedFile.name)
    }

    if (update) {
      data.append('_id', props._id)
      updateNote(data)
      toggleEditMode()
      closeOptions()
    } else {
      addNote(data)
      setColor(colorsArray[~~(Math.random() * 10)])
      setCategory('')
      setTitle('')
      setContent('')
      setSelectedFile(null)
    }
  }

  return (
    <div className={styles.note}>
      <form onSubmit={props.user.name ? saveNoteOnCloudHandler : saveNoteLocallyHandler} autoComplete="off">
        <img
          className={styles.colorPalette}
          src={colorPaletteIcon}
          alt="Choose color"
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        {showColorPicker ? (
          <GithubPicker
            className={styles.colorPicker}
            width="262px"
            triangle="hide"
            colors={colorsArray}
            onChangeComplete={colorHanlder}
          />
        ) : (
          <>
            <div className={styles.categoryBackground} style={{ backgroundColor: color }}>
              &nbsp;
            </div>
            <input
              className={styles.category}
              type="text"
              value={category.toUpperCase()}
              dir="auto"
              placeholder="CATEGORY"
              maxLength="24"
              title="Optional"
              onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))} // forces maxLength on mobile devices
            />
          </>
        )}
        <input
          className={`${styles.title} ${theme === 'dark' ? styles.titleDark : ''}`}
          type="text"
          dir="auto"
          placeholder="Title"
          value={title}
          title="Optional"
          maxLength="60"
          onChange={event => setTitle(event.target.value)}
        />
        <>
          <textarea
            className={styles.content}
            dir="auto"
            value={content}
            title="Note's content"
            required
            onChange={event => setContent(event.target.value)}
          ></textarea>
          {localStorage.name && (
            <>
              <label htmlFor={`file-input-${props._id}`}>
                <img
                  className={styles.upload}
                  src={uploadIcon}
                  alt={selectedFile ? selectedFile.name : props.fileName || 'Upload a File'}
                  title={selectedFile ? selectedFile.name : props.fileName || 'Upload a File'}
                  onClick={() => {}}
                />
              </label>
              <input className={styles.fileInput} id={`file-input-${props._id}`} type="file" onChange={fileHandler} />
            </>
          )}
        </>
        <input className={styles.save} type="submit" value="SAVE" />
        {addingNote && <NoteSpinner />}
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
