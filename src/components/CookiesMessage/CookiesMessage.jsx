import { func } from 'prop-types'

import { MESSAGE } from './constants'

import style from './CookiesMessage.scss'

const CookiesMessage = ({ onClick }) => {
  return (
    <div className={style.wrapper} onClick={onClick}>
      {MESSAGE}
    </div>
  )
}

CookiesMessage.propTypes = {
  onClick: func.isRequired
}

export default CookiesMessage
