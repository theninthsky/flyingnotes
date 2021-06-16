import { any, func } from 'prop-types'

import style from './UpdateAlert.scss'

const UpdateAlert = ({ children, onClick }) => {
  return (
    <div className={style.alert} onClick={onClick}>
      {children}
    </div>
  )
}

UpdateAlert.propTypes = {
  children: any,
  onClick: func
}

export default UpdateAlert
