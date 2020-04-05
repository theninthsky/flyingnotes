import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import styles from './Options.module.scss'
import editSymbol from '../../assets/images/edit.svg'
import deleteSymbol from '../../assets/images/delete.svg'
import confirmSymbol from '../../assets/images/confirm.svg'
import cancelSymbol from '../../assets/images/cancel.svg'

const Options = props => {
  const [showConfirmIcons, setShowConfirmIcons] = useState(false)

  const deletePressedHandler = mode => {
    props.toggleConfirmMessage(mode)
    setShowConfirmIcons(mode)
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
            onClick={() => props.deleteNote(props.id)}
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
          <img
            className={styles.edit}
            src={editSymbol}
            alt="Edit"
            title="Edit"
            onClick={props.edit}
          />
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

const mapDispatchToProps = dispatch => ({
  deleteNote: noteID => dispatch(actions.requestDeleteNote(noteID)),
})

export default connect(null, mapDispatchToProps)(Options)
