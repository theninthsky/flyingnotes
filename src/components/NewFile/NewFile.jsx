import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { toBase64 } from 'util/base64'
import { themeState, filesState } from 'atoms'
import If from 'components/If'
import { Wrapper, Category, Name, InfoWrap, FileLabel, FileSelect, FileInput, Upload } from './style'

import uploadIcon from 'assets/images/upload.svg'

const NewFile = props => {
  const theme = useRecoilValue(themeState)
  const [files, setFiles] = useRecoilState(filesState)

  const [category, setCategory] = useState(props.category || '')
  const [name, setName] = useState(props.name || '')
  const [extension, setExtension] = useState(props.extension || '')
  const [selectedFile, setSelectedFile] = useState()
  const [uploading, setUploading] = useState(false)

  const resetFile = () => {
    setCategory('')
    setName('')
    setExtension('')
    setSelectedFile(null)
  }

  const loadFile = event => {
    const [file] = event.target.files

    if (!file) return

    if (file.size <= 10 * 1024 * 1024) {
      const fileName = file.name.slice(0, file.name.lastIndexOf('.'))
      const fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)

      setName(fileName.trim())
      setExtension(fileExtension.toLowerCase().trim())
      setSelectedFile(file)
    } else {
      alert('File size exceeds 10MB')
      resetFile()
      document.querySelector('#file-input').value = ''
    }
  }

  const uploadFile = async event => {
    event.preventDefault()

    if (!name) return alert('File name is required')

    setUploading(true)

    const base64 = await toBase64(selectedFile)
    const { file } = await ws.json({ type: 'uploadFile', file: { category, name, extension, base64 } })

    setFiles([...files, file])
    resetFile()

    setUploading(false)
  }

  return (
    <Wrapper uploading={uploading} onSubmit={uploadFile} autoComplete="off">
      <Category
        type="text"
        value={category}
        dir="auto"
        placeholder="CATEGORY"
        maxLength="24"
        title="Optional"
        onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))} // forces maxLength on mobile
      />

      <Name
        theme={theme}
        type="text"
        dir="auto"
        placeholder="Name"
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <InfoWrap>
        <div title={extension}>{extension}</div>

        <FileLabel htmlFor="file-input">
          <FileSelect
            src={uploadIcon}
            alt={selectedFile ? selectedFile.name : props.name || 'Upload a File'}
            title={selectedFile ? selectedFile.name : props.name || 'Upload a File'}
          />
        </FileLabel>
        <FileInput id="file-input" type="file" onChange={loadFile} />

        <If condition={selectedFile}>
          <Upload type="submit" value="UPLOAD" />
        </If>
      </InfoWrap>
    </Wrapper>
  )
}

export default NewFile
