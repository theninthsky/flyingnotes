import { useState } from 'react'

import { Wrapper, Confirm, Cancel, Edit, Delete } from './style'

import editIcon from 'assets/images/edit.svg'
import deleteIcon from 'assets/images/delete.svg'
import confirmIcon from 'assets/images/confirm.svg'
import cancelIcon from 'assets/images/cancel.svg'

const Options = ({ onEdit, onDelete, toggleConfirmMessage }) => {
  const [confirmIconsAreVisible, setConfirmIconsAreVisible] = useState(false)

  const confirmDeletion = bool => {
    toggleConfirmMessage(bool)
    setConfirmIconsAreVisible(bool)
  }

  return (
    <Wrapper>
      {confirmIconsAreVisible ? (
        <>
          <Confirm src={confirmIcon} alt="Confirm" title="Confirm" onClick={onDelete} />
          <Cancel src={cancelIcon} alt="Cancel" title="Cancel" onClick={() => confirmDeletion(false)} />
        </>
      ) : (
        <>
          <Edit src={editIcon} alt="Edit" title="Edit" onClick={onEdit} />
          <Delete src={deleteIcon} alt="Delete" title="Delete" onClick={() => confirmDeletion(true)} />
        </>
      )}
    </Wrapper>
  )
}

export default Options
