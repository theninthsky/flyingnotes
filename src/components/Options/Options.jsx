import { useState } from 'react'
import { func } from 'prop-types'

import { Wrapper, Confirm, Cancel, Delete } from './style'

import deleteIcon from 'images/delete.svg'
import confirmIcon from 'images/confirm.svg'
import cancelIcon from 'images/cancel.svg'

const Options = ({ onDelete, toggleConfirmMessage }) => {
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
        <Delete src={deleteIcon} alt="Delete" title="Delete" onClick={() => confirmDeletion(true)} />
      )}
    </Wrapper>
  )
}

Options.propTypes = {
  onDelete: func,
  toggleConfirmMessage: func
}

export default Options
