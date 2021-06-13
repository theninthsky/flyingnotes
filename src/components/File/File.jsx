import { useState, useRef } from 'react'
import { bool, string, func } from 'prop-types'
import useClickOutside from 'use-click-outside'

import { saveFile } from 'util/base64'
import { If } from 'components'
import { MAX_FILESIZE_IN_MB } from './constants'
import { Wrapper, Name, InfoWrap, Extension, Upload, UploadIcon, DownloadIcon, DeleteIcon } from './style'

const File = ({
  newFile,
  _id: fileID,
  name: fileName = '',
  extension: fileExtension = '',
  onUploadFile,
  onDownloadFile,
  onDeleteFile
}) => {
  const [name, setName] = useState(fileName)
  const [extension, setExtension] = useState(fileExtension)
  const [selectedFile, setSelectedFile] = useState()
  const [attachment, setAttachment] = useState()
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [deleteIsVisible, setDeleteIsVisible] = useState(false)

  const fileRef = useRef()

  useClickOutside(fileRef, () => setDeleteIsVisible(false))

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

  const uploadFile = async event => {
    event.preventDefault()

    if (!name) return alert('File name is required')

    setLoading(true)
    await onUploadFile(selectedFile, name, extension)
    resetFile()
    setLoading(false)
  }

  const downloadFile = async () => {
    if (attachment) return saveFile(name, extension, attachment)

    setDownloading(true)

    const fileAttachment = await onDownloadFile(fileID, name, extension)

    setAttachment(fileAttachment)
    setDownloading(false)
  }

  const deleteFile = async () => {
    setLoading(true)
    onDeleteFile(fileID)
  }

  return (
    <Wrapper
      transparent={loading}
      ref={fileRef}
      autoComplete="off"
      onClick={() => setDeleteIsVisible(true)}
      onSubmit={uploadFile}
    >
      <Name
        type="text"
        placeholder="Name"
        value={name}
        disabled={!newFile}
        aria-label="name"
        onChange={event => setName(event.target.value)}
      />

      <InfoWrap>
        {!newFile && deleteIsVisible ? (
          <DeleteIcon
            onClick={() => {
              if (window.confirm(`Delete ${name}.${extension}?`)) deleteFile()
            }}
          />
        ) : (
          <Extension title={extension}>{extension}</Extension>
        )}

        <If condition={newFile}>
          {selectedFile ? (
            <Upload type="submit" value="UPLOAD" />
          ) : (
            <>
              <label style={{ height: '15px' }} htmlFor="file-input">
                <UploadIcon />
              </label>
              <input style={{ display: 'none' }} id="file-input" type="file" onChange={loadFile} />
            </>
          )}
        </If>

        <If condition={!newFile}>
          <DownloadIcon downloading={downloading} onClick={downloadFile} />
        </If>
      </InfoWrap>
    </Wrapper>
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
