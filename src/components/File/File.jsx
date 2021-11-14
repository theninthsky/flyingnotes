import { useState, useRef } from 'react'
import { bool, string, func } from 'prop-types'
import useClickOutside from 'use-click-outside'
import { If } from 'frontend-essentials'
import cx from 'clsx'

import style from './File.scss'
import UploadIcon from 'images/upload.svg'
import DownloadIcon from 'images/download.svg'
import DeleteIcon from 'images/delete.svg'

const MAX_FILESIZE_IN_MB = 50

const File = ({ newFile, name: fileName = '', extension: fileExtension = '', onUpload, onDownload, onDelete }) => {
  const [name, setName] = useState(fileName)
  const [extension, setExtension] = useState(fileExtension)
  const [selectedFile, setSelectedFile] = useState()
  const [deleteIsVisible, setDeleteIsVisible] = useState(false)

  const fileRef = useRef()

  useClickOutside(fileRef, () => setDeleteIsVisible(false))

  const reset = () => {
    setName('')
    setExtension('')
    setSelectedFile(null)
  }

  const loadingUpload = false
  const loadingDownload = false

  const loadFile = event => {
    const [file] = event.target.files

    if (!file) return

    if (file.size <= MAX_FILESIZE_IN_MB * 1024 * 1024) {
      const fileName = file.name.slice(0, file.name.lastIndexOf('.'))
      const fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)

      setName(fileName.trim())
      setExtension(fileExtension.toLowerCase().trim())
      setSelectedFile(file)
    } else {
      alert(`File size exceeds ${MAX_FILESIZE_IN_MB}MB`)
      reset()
      document.querySelector('#file-input').value = ''
    }
  }

  const uploadFile = event => {
    event.preventDefault()

    if (!name) return alert('File name is required')

    onUpload(selectedFile, reset)
  }

  return (
    <form
      className={cx(style.wrapper, { [style.disabled]: loadingUpload })}
      ref={fileRef}
      autoComplete="off"
      onClick={() => setDeleteIsVisible(true)}
      onSubmit={uploadFile}
    >
      <input
        className={style.name}
        type="text"
        placeholder="Name"
        value={name}
        title={name}
        disabled={!newFile}
        aria-label="name"
        onChange={event => setName(event.target.value)}
      />

      <div className={style.infoWrap}>
        {!newFile && deleteIsVisible ? (
          <DeleteIcon
            className={style.deleteIcon}
            onClick={() => {
              if (window.confirm(`Delete ${name}.${extension}?`)) onDelete()
            }}
          />
        ) : (
          <div className={style.extension} title={extension}>
            {extension}
          </div>
        )}

        <If condition={newFile}>
          {selectedFile ? (
            <input className={style.upload} type="submit" value="UPLOAD" />
          ) : (
            <>
              <label className={style.uploadLabel} htmlFor="file-input">
                <UploadIcon className={style.uploadIcon} />
              </label>
              <input className="d-none" id="file-input" type="file" onChange={loadFile} />
            </>
          )}
        </If>

        <If condition={!newFile}>
          <DownloadIcon
            className={cx(style.downloadIcon, { [style.downloading]: loadingDownload })}
            onClick={onDownload}
          />
        </If>
      </div>
    </form>
  )
}

File.propTypes = {
  newFile: bool,
  name: string,
  extension: string,
  onUpload: func,
  onDownload: func,
  onDelete: func
}

export default File
