import { useState } from 'react'
import { func } from 'prop-types'

import style from './Options.scss'
import DeleteIcon from 'images/delete.svg'
import ConfirmIcon from 'images/confirm.svg'
import CancelIcon from 'images/cancel.svg'

const Options = ({ onDelete, toggleConfirmMessage }) => {
  const [confirmIconsAreVisible, setConfirmIconsAreVisible] = useState(false)

  const confirmDeletion = bool => {
    toggleConfirmMessage(bool)
    setConfirmIconsAreVisible(bool)
  }

  return (
    <div className={style.wrapper}>
      {confirmIconsAreVisible ? (
        <>
          <ConfirmIcon className={style.confirmIcon} onClick={onDelete} />
          <CancelIcon className={style.cancelIcon} onClick={() => confirmDeletion(false)} />
        </>
      ) : (
        <DeleteIcon className={style.deleteIcon} onClick={() => confirmDeletion(true)} />
      )}
    </div>
  )
}

Options.propTypes = {
  onDelete: func,
  toggleConfirmMessage: func
}

export default Options
