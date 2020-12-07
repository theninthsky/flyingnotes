import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { toBase64, fromBase64, saveFile } from 'util/base64'
import { themeState, filesState } from 'atoms'
import If from 'components/If'
import { MAX_FILESIZE_IN_MB } from './constants'
import {
  Wrapper,
  Category,
  Name,
  InfoWrap,
  Extension,
  FileLabel,
  FileSelect,
  FileInput,
  Upload,
  Download,
  Delete
} from './style'

import uploadIcon from 'assets/images/upload.svg'
import downloadIcon from 'assets/images/download.svg'
import deleteIcon from 'assets/images/delete.svg'

const File = ({
  newFile,
  _id: fileID,
  category: fileCategory = '',
  name: fileName = '',
  extension: fileExtension = ''
}) => {
  const theme = useRecoilValue(themeState)
  const [files, setFiles] = useRecoilState(filesState)

  const [category, setCategory] = useState(fileCategory)
  const [name, setName] = useState(fileName)
  const [extension, setExtension] = useState(fileExtension)
  const [selectedFile, setSelectedFile] = useState()
  const [attachment, setAttachment] = useState()
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [deleteIsVisible, setDeleteIsVisible] = useState(false)

  const resetFile = () => {
    setCategory('')
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

    const base64 = await toBase64(selectedFile)
    const { file } = await ws.json({ type: 'uploadFile', file: { category, name, extension, base64 } })

    setFiles([...files, file])
    resetFile()

    setLoading(false)
  }

  const downloadFile = async () => {
    if (attachment) return saveFile(name, extension, attachment)

    setDownloading(true)

    const { base64 } = await ws.json({ type: 'downloadFile', fileID })
    const fileAttachment = await fromBase64(name, base64)

    setDownloading(false)
    setAttachment(fileAttachment)
    saveFile(name, extension, fileAttachment)
  }

  const deleteFile = async () => {
    setLoading(true)

    const { status } = await ws.json({ type: 'deleteFile', fileID })

    if (status === 'SUCCESS') setFiles(files.filter(({ _id }) => _id !== fileID))
  }

  return (
    <Wrapper
      transparent={loading}
      autoComplete="off"
      onMouseMove={() => setDeleteIsVisible(true)}
      onMouseLeave={() => setDeleteIsVisible(false)}
      onSubmit={uploadFile}
    >
      <If condition={category || newFile}>
        <Category
          type="text"
          value={category}
          dir="auto"
          placeholder="CATEGORY"
          maxLength="24"
          title="Optional"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))} // forces maxLength on mobile
        />
      </If>

      <Name
        theme={theme}
        type="text"
        dir="auto"
        placeholder="Name"
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <InfoWrap>
        {!newFile && deleteIsVisible ? (
          <Delete
            src={deleteIcon}
            alt="Delete"
            title="Delete"
            onClick={() => {
              if (window.confirm(`Delete ${name}.${extension}?`)) deleteFile()
            }}
          />
        ) : (
          <Extension title={extension}>{extension}</Extension>
        )}

        <If condition={newFile}>
          <FileLabel htmlFor="file-input">
            <FileSelect
              src={uploadIcon}
              alt={selectedFile?.name || 'Upload a File'}
              title={selectedFile?.name || 'Upload a File'}
            />
          </FileLabel>
          <FileInput id="file-input" type="file" onChange={loadFile} />

          <If condition={selectedFile}>
            <Upload type="submit" value="UPLOAD" />
          </If>
        </If>

        <If condition={!newFile}>
          <Download
            downloading={downloading}
            alt="Download"
            title="Download"
            src={downloadIcon}
            onClick={downloadFile}
          />
        </If>
      </InfoWrap>
    </Wrapper>
  )
}

export default File
