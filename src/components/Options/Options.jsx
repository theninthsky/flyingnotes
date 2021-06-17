import { useState } from 'react'
import { func } from 'prop-types'

import style from './Options.scss'
import DeleteIcon from 'images/delete.svg'
import ConfirmIcon from 'images/confirm.svg'
import CancelIcon from 'images/cancel.svg'

const Options = ({ onDelete, setConfirmMessage }) => {
  const [confirmIconsVisible, setConfirmIconsVisible] = useState(false)

  const confirmDeletion = bool => {
    setConfirmMessage(bool)
    setConfirmIconsVisible(bool)
  }

  return (
    <div className={style.wrapper}>
      {confirmIconsVisible ? (
        <>
          <ConfirmIcon className={style.confirmIcon} onClick={onDelete} />
          <CancelIcon className={style.cancelIcon} onClick={() => confirmDeletion(false)} />
        </>
      ) : (
        <DeleteIcon
          className={style.deleteIcon}
          onClick={event => {
            event.stopPropagation()
            confirmDeletion(true)
          }}
        />
      )}
    </div>
  )
}

Options.propTypes = {
  onDelete: func,
  setConfirmMessage: func
}

export default Options
