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

const mapStateToProps = state => ({
  app: state.app,
})

const mapDispatchToProps = dispatch => ({
  fetchFile: note => dispatch(actions.fetchFile(note)),
})

const Note = props => {
  const { _id, color, category, title, content, date, fileName, file } = props
  const { theme, fetchingFile, updatingNote, deletingNote } = props.app
  const { fetchFile } = props

  const [showOptions, setShowOptions] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

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

  return editMode ? (
    <NewNote
      {...props}
      toggleEditMode={() => setEditMode(!editMode)}
      closeOptions={() => setShowOptions(showConfirmMessage)}
      update
    />
  ) : (
    <div
      className={styles.note}
      onMouseMove={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(showConfirmMessage)}
    >
      {category && (
        <>
          <div className={styles.categoryBackground} style={{ backgroundColor: color }}>
            &nbsp;
          </div>
          <div className={styles.category} dir="auto">
            {category.toUpperCase()}
          </div>
        </>
      )}

      {title && (
        <h1 className={styles.title} dir="auto">
          {title}
        </h1>
      )}

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
      ) : (
        fileName &&
        (fetchingFile === _id ? (
          <FileSpinner />
        ) : (
          <img
            className={`${styles.file} ${theme === 'dark' ? styles.fileDark : ''}`}
            src={fileIcon}
            alt={fileName}
            title={fileName}
            onClick={downloadFileHandler}
          />
        ))
      )}

      {updatingNote === _id || deletingNote === _id ? (
        <NoteSpinner />
      ) : (
        showOptions && (
          <Options
            id={_id}
            edit={() => setEditMode(!editMode)}
            toggleConfirmMessage={mode => setShowConfirmMessage(mode)}
          />
        )
      )}

      {showConfirmMessage && updatingNote !== _id && deletingNote !== _id ? (
        <div className={styles.confirmMessage}>Delete this note?</div>
      ) : (
        <div className={styles.date}>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
