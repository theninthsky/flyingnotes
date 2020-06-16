import React, { useState } from 'react'
import { connect } from 'react-redux'

import { requestDeleteNote } from '../../store/actions/index'

import editSymbol from '../../assets/images/edit.svg'
import deleteSymbol from '../../assets/images/delete.svg'
import confirmSymbol from '../../assets/images/confirm.svg'
import cancelSymbol from '../../assets/images/cancel.svg'
import style from './Options.module.scss'

const mapDispatchToProps = dispatch => ({
  deleteNote: noteID => dispatch(requestDeleteNote(noteID)),
})

const Options = ({ id, edit, deleteNote, toggleConfirmMessage }) => {
  const [showConfirmIcons, setShowConfirmIcons] = useState(false)

  const deletePressedHandler = bool => {
    toggleConfirmMessage(bool)
    setShowConfirmIcons(bool)
  }

  return (
    <div className={style.options}>
      {showConfirmIcons ? (
        <>
          <img
            className={style.confirm}
            src={confirmSymbol}
            alt="Confirm"
            title="Confirm"
            onClick={() => deleteNote(id)}
          />
          <img
            className={style.cancel}
            src={cancelSymbol}
            alt="Cancel"
            title="Cancel"
            onClick={() => deletePressedHandler(false)}
          />
        </>
      ) : (
        <>
          <img className={style.edit} src={editSymbol} alt="Edit" title="Edit" onClick={edit} />
          <img
            className={style.delete}
            src={deleteSymbol}
            alt="Delete"
            title="Delete"
            onClick={() => deletePressedHandler(true)}
          />
        </>
      )}
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Options)
