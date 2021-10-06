import { useState, useRef } from 'react'
import { bool, string, func } from 'prop-types'
import useClickOutside from 'use-click-outside'
import { useAxios, If } from 'frontend-essentials'
import cx from 'clsx'

import { toBase64, fromBase64, saveFile } from 'util/base64'
import { MAX_FILESIZE_IN_MB } from './constants'

import style from './File.scss'
import UploadIcon from 'images/upload.svg'
import DownloadIcon from 'images/download.svg'
import DeleteIcon from 'images/delete.svg'

const File = ({ newFile, _id: fileID, name: fileName = '', extension: fileExtension = '', addFile, onDeleteFile }) => {
  const [name, setName] = useState(fileName)
  const [extension, setExtension] = useState(fileExtension)
  const [selectedFile, setSelectedFile] = useState()
  const [attachment, setAttachment] = useState()
  const [deleteIsVisible, setDeleteIsVisible] = useState(false)

  const fileRef = useRef()

  useClickOutside(fileRef, () => setDeleteIsVisible(false))

  const { loading: loadingUpload, activate: uploadFile } = useAxios({
    url: '/files',
    method: 'post',
    manual: true,
    onSuccess: ({ data }) => {
      addFile(data)
      resetFile()
    }
  })
  const { loading: loadingDownload, activate: downloadFile } = useAxios({
    url: '/download',
    method: 'post',
    manual: true
  })

  const resetFile = () => {
    setName('')
    setExtension('')
    setSelectedFile(null)
  }

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
      resetFile()
      document.querySelector('#file-input').value = ''
    }
  }

  const onUploadFile = async event => {
    event.preventDefault()

    if (!name) return alert('File name is required')

    const base64 = await toBase64(selectedFile)

    uploadFile({ data: { name, extension, base64 } })
  }

  const onDownloadFile = async () => {
    if (attachment) return saveFile(name, extension, attachment)

    downloadFile({
      data: { fileID },
      onSuccess: async ({ data: { base64 } }) => {
        const fileAttachment = await fromBase64(name, base64)

        setAttachment(fileAttachment)
        saveFile(name, extension, fileAttachment)
      }
    })
  }

  return (
    <form
      className={cx(style.wrapper, { [style.disabled]: loadingUpload })}
      ref={fileRef}
      autoComplete="off"
      onClick={() => setDeleteIsVisible(true)}
      onSubmit={onUploadFile}
    >
      <input
        className={style.name}
        type="text"
        placeholder="Name"
        value={name}
        disabled={!newFile}
        aria-label="name"
        onChange={event => setName(event.target.value)}
      />

      <div className={style.infoWrap}>
        {!newFile && deleteIsVisible ? (
          <DeleteIcon
            className={style.deleteIcon}
            onClick={() => {
              if (window.confirm(`Delete ${name}.${extension}?`)) onDeleteFile(fileID)
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
            onClick={onDownloadFile}
          />
        </If>
      </div>
    </form>
  )
}

File.propTypes = {
  newFile: bool,
  _id: string,
  name: string,
  extension: string,
  onUploadFile: func,
  onDownloadFile: func,
  onDeleteFile: func
}

export default File
