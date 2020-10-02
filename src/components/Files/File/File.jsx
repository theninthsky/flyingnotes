import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { downloadFile } from '../../../store/actions'
import FileSpinner from '../../UI/FileSpinner'

import style from './File.module.scss'
import downloadIcon from '../../../assets/images/download.svg'

const saveFile = (name, extension, attachment) => {
  const link = document.createElement('a')

  link.href = window.URL.createObjectURL(new Blob([attachment]))
  link.setAttribute('download', `${name}.${extension}`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const mapStateToProp = state => ({ app: state.app })

const mapDispatchToProps = { downloadFile }

const File = ({
  file: { _id, category, name, extension, attachment },
  app: { downloadingFileID } = {},
  downloadFile,
}) => {
  useEffect(() => {
    if (attachment) saveFile(name, extension, attachment)
  }, [attachment, name, extension])

  const downloadFileHandler = () => {
    if (!attachment) return downloadFile(_id)

    saveFile(name, extension, attachment)
  }

  return (
    <div className={style.file}>
      {category && <div className={style.category}>{category.toUpperCase()}</div>}

      <h1 className={style.name} title={name}>
        {name}
      </h1>

      <div className={style.infoWrap}>
        <div className={style.extension} title={extension}>
          {extension}
        </div>

        {downloadingFileID === _id ? (
          <FileSpinner />
        ) : (
          <img className={style.download} alt="Download" src={downloadIcon} onClick={downloadFileHandler} />
        )}
      </div>
    </div>
  )
}

export default connect(mapStateToProp, mapDispatchToProps)(File)
