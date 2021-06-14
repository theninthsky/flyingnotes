import { func } from 'prop-types'

import style from './Backdrop.scss'

const Backdrop = ({ onClick }) => {
  return <div className={style.backdrop} onClick={onClick} />
}

Backdrop.propTypes = {
  onClick: func
}

export default Backdrop
