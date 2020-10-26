import { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { uploadFile } from '../../../store/actions'

import uploadIcon from '../../../assets/images/upload.svg'

// #region Styles
const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 34px;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ uploadingFile }) => (uploadingFile ? '0.5' : '1')};
  pointer-events: ${({ uploadingFile }) => (uploadingFile ? 'none' : 'auto')};
  transition: 0.2s;
  animation: showNewFile 0.5s;

  &:hover {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes showNewFile {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 10px 0;
  }
`
const Category = styled.input`
  width: 25%;
  padding: 9px 5px;
  text-align: center;
  border: none;
  border-radius: 4px 0 0 4px;
  outline: none;
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 3px;
  color: rgb(150, 150, 150);
  background-color: #ffffde;

  &::placeholder {
    color: rgb(190, 190, 190);
  }
`
const Name = styled.input`
  width: 50%;
  margin: 0 10px;
  padding: 0;
  border: none;
  outline: none;
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  font-size: 18px;

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? 'rgb(200, 200, 200)' : 'auto')};
  }
`
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25%;
  height: 100%;

  @media (max-width: 480px) {
    width: 25%;
    font-size: 12px;
  }
`
const FileLabel = styled.label`
  height: 15px;
`
const FileSelect = styled.img`
  width: 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
const FileInput = styled.input`
  display: none;
`
const Upload = styled.input`
  padding: 0;
  border: none;
  outline: none;
  font-family: inherit;
  color: red;
  background-color: inherit;
  font-size: 12px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`
// #endregion

const NewFile = props => {
  const dispatch = useDispatch()
  const { theme, uploadingFile } = useSelector(
    ({ app: { theme, uploadingFile } }) => ({ theme, uploadingFile }),
    shallowEqual,
  )

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

    if (file.size <= 1024 * 1024 * 10) {
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
