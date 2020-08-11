import React, { useState } from 'react'
import { connect } from 'react-redux'

import Options from './Options/Options'
import NewNote from '../NewNote/NewNote'

import style from './Note.module.scss'

const mapStateToProps = state => ({
  app: state.app,
})

const Note = props => {
  const {
    _id,
    category,
    title,
    content,
    date,
    app: { updatingNote, deletingNote },
  } = props

  const [showOptions, setShowOptions] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

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
          <div className={style.categoryBackground}>&nbsp;</div>
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

      {showOptions && (
        <Options
          id={_id}
          edit={() => setEditMode(!editMode)}
          toggleConfirmMessage={mode => setShowConfirmMessage(mode)}
        />
      )}

      {showConfirmMessage && updatingNote !== _id && deletingNote !== _id ? (
        <div className={style.confirmMessage}>Delete this note?</div>
      ) : (
        <div className={style.date}>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</div>
      )}
    </div>
  )
}

// updatingNote === _id || deletingNote === _id

export default connect(mapStateToProps)(Note)
