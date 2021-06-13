import { useState } from 'react'
import { func } from 'prop-types'

import { Wrapper, ConfirmIcon, CancelIcon, DeleteIcon } from './style'

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
          <ConfirmIcon onClick={onDelete} />
          <CancelIcon onClick={() => confirmDeletion(false)} />
        </>
      ) : (
        <DeleteIcon onClick={() => confirmDeletion(true)} />
      )}
    </Wrapper>
  )
}

Options.propTypes = {
  onDelete: func,
  toggleConfirmMessage: func
}

export default Options
