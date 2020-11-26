import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteNote } from 'store/actions/index'
import { Wrapper, Confirm, Cancel, Edit, Delete } from './style'

import editSymbol from 'assets/images/edit.svg'
import deleteSymbol from 'assets/images/delete.svg'
import confirmSymbol from 'assets/images/confirm.svg'
import cancelSymbol from 'assets/images/cancel.svg'

const Options = ({ id, onEdit, toggleConfirmMessage }) => {
  const dispatch = useDispatch()

  const [showConfirmIcons, setShowConfirmIcons] = useState(false)

  const handleDelete = bool => {
    toggleConfirmMessage(bool)
    setShowConfirmIcons(bool)
  }

  return (
    <Wrapper>
      {showConfirmIcons ? (
        <>
          <Confirm src={confirmSymbol} alt="Confirm" title="Confirm" onClick={() => dispatch(deleteNote(id))} />
          <Cancel src={cancelSymbol} alt="Cancel" title="Cancel" onClick={() => handleDelete(false)} />
        </>
      ) : (
        <>
          <Edit src={editSymbol} alt="Edit" title="Edit" onClick={onEdit} />
          <Delete src={deleteSymbol} alt="Delete" title="Delete" onClick={() => handleDelete(true)} />
        </>
      )}
    </Wrapper>
  )
}

export default Options
