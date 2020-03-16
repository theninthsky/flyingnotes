import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import Options from './Options'
import NewNote from './NewNote'
import NoteSpinner from '../UI/NoteSpinner'
import FileSpinner from '../UI/FileSpinner'
import styles from './Note.module.scss'

import fileIcon from '../../assets/images/file.svg'
import downloadIcon from '../../assets/images/download.svg'

const Note = props => {
  const { _id, color, category, title, content, date, fileName, file } = props
  const { theme, fetchingFile, updatingNote, deletingNote } = props.user
  const { fetchFile } = props

  const [showOptions, setShowOptions] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

  const toggleOptionsHandler = mode =>
    setShowOptions(showConfirmMessage ? true : mode)

  const toggleConfirmMessageHanlder = mode => setShowConfirmMessage(mode)

  const toggleEditModeHandler = () => setEditMode(!editMode)

  const downloadFileHandler = () => {
    if (file) {
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(new Blob([file]))
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      fetchFile({ _id, color, category, title, content, date, fileName })
    }
  }

  const note = editMode ? (
    <NewNote
      {...props}
      toggleEditMode={toggleEditModeHandler}
      closeOptions={() => toggleOptionsHandler(false)}
      update
    />
  ) : (
    <div
      className={`${styles.note} ${theme === 'dark' ? styles.noteDark : ''}`}
      onMouseMove={() => toggleOptionsHandler(true)}
      onMouseLeave={() => toggleOptionsHandler(false)}
    >
      {category ? (
        <>
          <div
            className={styles.categoryBackground}
            style={{ backgroundColor: color }}
          >
            &nbsp;
          </div>
          <div className={styles.category} dir="auto">
            {category.toUpperCase()}
          </div>
        </>
      ) : null}

      {title ? (
        <h1 className={styles.title} dir="auto">
          {title}
        </h1>
      ) : null}

      <div className={styles.content} dir="auto">
        {content}
      </div>

      {file ? (
        <img
          className={styles.download}
          src={downloadIcon}
          alt={fileName}
          title={fileName}
          onClick={downloadFileHandler}
        />
      ) : fileName ? (
        fetchingFile === _id ? (
          <FileSpinner />
        ) : (
          <img
            className={`${styles.file} ${
              theme === 'dark' ? styles.fileDark : ''
            }`}
            src={fileIcon}
            alt={fileName}
            title={fileName}
            onClick={downloadFileHandler}
          />
        )
      ) : null}

      {updatingNote === _id || deletingNote === _id ? (
        <NoteSpinner />
      ) : showOptions ? (
        <Options
          id={_id}
          edit={toggleEditModeHandler}
          toggleConfirmMessage={toggleConfirmMessageHanlder}
        />
      ) : null}

      {showConfirmMessage && updatingNote !== _id && deletingNote !== _id ? (
        <div className={styles.confirmMessage}>Delete this note?</div>
      ) : (
        <div className={styles.date}>
          {new Date(date)
            .toLocaleString('en-GB')
            .replace(',', '')
            .slice(0, -3)}
        </div>
      )}
    </div>
  )

  return note
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchFile: note => dispatch(actions.fetchFile(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
