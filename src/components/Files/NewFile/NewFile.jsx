import { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRecoilValue } from 'recoil'

import { uploadFile } from '../../../store/actions'
import { themeState } from '../../App/atoms'
import { Wrapper, Category, Name, InfoWrap, FileLabel, FileSelect, FileInput, Upload } from './style'

import uploadIcon from '../../../assets/images/upload.svg'

const NewFile = props => {
  const dispatch = useDispatch()
  const uploadingFile = useSelector(({ app: { uploadingFile } }) => uploadingFile, shallowEqual)

  const theme = useRecoilValue(themeState)

  const [category, setCategory] = useState(props.category || '')
  const [name, setName] = useState(props.name || '')
  const [extension, setExtension] = useState(props.extension || '')
  const [selectedFile, setSelectedFile] = useState()

  useEffect(() => {
    if (!uploadingFile) {
      setCategory('')
      setName('')
      setExtension('')
      setSelectedFile(null)
    }
  }, [uploadingFile])

  const fileHandler = event => {
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
      setCategory('')
      setName('')
      setExtension('')
      setSelectedFile(null)
      document.querySelector('#file-input').value = ''
    }
  }

  const submitForm = event => {
    event.preventDefault()

    if (!name) return alert('File name is required')

    dispatch(uploadFile({ category, name, extension, selectedFile }))
  }

  return (
    <Wrapper uploadingFile={uploadingFile} onSubmit={submitForm} autoComplete="off">
      <Category
        type="text"
        value={category}
        dir="auto"
        placeholder="CATEGORY"
        maxLength="24"
        title="Optional"
        onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))} // forces maxLength on mobile devices
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
        <FileInput id="file-input" type="file" onChange={fileHandler} />

        {selectedFile && <Upload type="submit" value="UPLOAD" />}
      </InfoWrap>
    </Wrapper>
  )
}

export default NewFile
