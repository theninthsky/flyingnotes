import React, { useState } from 'react'
import { connect } from 'react-redux'

import { fetchFile } from '../../store/actions/index'
import Options from '../Options/Options'
import NewNote from '../NewNote/NewNote'
import NoteSpinner from '../UI/NoteSpinner'
import FileSpinner from '../UI/FileSpinner'

import fileIcon from '../../assets/images/file.svg'
import downloadIcon from '../../assets/images/download.svg'
import style from './Note.module.scss'

const mapStateToProps = state => ({
  app: state.app,
})

const mapDispatchToProps = dispatch => ({
  fetchFile: note => dispatch(fetchFile(note)),
})

const Note = props => {
  const {
    _id,
    color,
    category,
    title,
    content,
    date,
    fileName,
    file,
    app: { theme, fetchingFile, updatingNote, deletingNote },
    fetchFile,
  } = props

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
      className={style.note}
      style={updatingNote === _id || deletingNote === _id ? { opacity: '0.5' } : {}}
      onMouseMove={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(showConfirmMessage)}
    >
      {category && (
        <>
          <div className={style.categoryBackground} style={{ backgroundColor: color }}>
            &nbsp;
          </div>
          <div className={style.category} dir="auto">
            {category.toUpperCase()}
          </div>
        </>
      )}

      {title && (
        <h1 className={style.title} dir="auto">
          {title}
        </h1>
      )}

      <div className={style.content} dir="auto">
        {content}
      </div>

      {file ? (
        <img
          className={style.download}
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
            className={`${style.file} ${theme === 'dark' ? style.fileDark : ''}`}
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
        <div className={style.confirmMessage}>Delete this note?</div>
      ) : (
        <div className={style.date}>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
