import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import styles from './Options.module.scss'
import editSymbol from '../../assets/images/edit.svg'
import deleteSymbol from '../../assets/images/delete.svg'
import confirmSymbol from '../../assets/images/confirm.svg'
import cancelSymbol from '../../assets/images/cancel.svg'

const mapDispatchToProps = dispatch => ({
  deleteNote: noteID => dispatch(actions.requestDeleteNote(noteID)),
})

const Options = ({ id, edit, deleteNote, toggleConfirmMessage }) => {
  const [showConfirmIcons, setShowConfirmIcons] = useState(false)

  const deletePressedHandler = bool => {
    toggleConfirmMessage(bool)
    setShowConfirmIcons(bool)
  }

  return (
    <div className={styles.options}>
      {showConfirmIcons ? (
        <>
          <img
            className={styles.confirm}
            src={confirmSymbol}
            alt="Confirm"
            title="Confirm"
            onClick={() => deleteNote(id)}
          />
          <img
            className={styles.cancel}
            src={cancelSymbol}
            alt="Cancel"
            title="Cancel"
            onClick={() => deletePressedHandler(false)}
          />
        </>
      ) : (
        <>
          <img className={styles.edit} src={editSymbol} alt="Edit" title="Edit" onClick={edit} />
          <img
            className={styles.delete}
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
