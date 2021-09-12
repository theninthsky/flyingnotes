import { any, func } from 'prop-types'

import style from './UpdateAlert.scss'
import UpdateDownloadedIcon from 'images/update-downloaded.svg'

const UpdateAlert = ({ onClick }) => {
  return (
    <div className={style.wrapper}>
      <UpdateDownloadedIcon className={style.updateDownloaded} />

      <p className={style.desc}>An update is available.</p>

      <button className={style.refresh} onClick={onClick}>
        REFRESH
      </button>
    </div>
  )
}

UpdateAlert.propTypes = {
  children: any,
  onClick: func
}

export default UpdateAlert
