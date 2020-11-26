import { useState } from 'react'

import { Wrapper, Confirm, Cancel, Edit, Delete } from './style'

import editSymbol from 'assets/images/edit.svg'
import deleteSymbol from 'assets/images/delete.svg'
import confirmSymbol from 'assets/images/confirm.svg'
import cancelSymbol from 'assets/images/cancel.svg'

const Options = ({ onEdit, onDelete, toggleConfirmMessage }) => {
  const [showConfirmIcons, setShowConfirmIcons] = useState(false)

  const confirmDeletion = bool => {
    toggleConfirmMessage(bool)
    setShowConfirmIcons(bool)
  }

  return (
    <Wrapper>
      {showConfirmIcons ? (
        <>
          <Confirm src={confirmSymbol} alt="Confirm" title="Confirm" onClick={onDelete} />
          <Cancel src={cancelSymbol} alt="Cancel" title="Cancel" onClick={() => confirmDeletion(false)} />
        </>
      ) : (
        <>
          <Edit src={editSymbol} alt="Edit" title="Edit" onClick={onEdit} />
          <Delete src={deleteSymbol} alt="Delete" title="Delete" onClick={() => confirmDeletion(true)} />
        </>
      )}
    </Wrapper>
  )
}

export default Options
