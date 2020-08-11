import React, { useState } from 'react'
import { connect } from 'react-redux'

import { uploadFile } from '../../../store/actions/files'

import uploadIcon from '../../../assets/images/upload.svg'
import style from './NewFile.module.scss'

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = { uploadFile }

const NewFile = props => {
  const {
    app: { theme },
    uploadFile,
  } = props

  const [category, setCategory] = useState(props.category || '')
  const [name, setName] = useState(props.name || '')
  const [extension, setExtension] = useState(props.extension || '')
  const [selectedFile, setSelectedFile] = useState()

  const fileHandler = event => {
    const [file] = event.target.files

    if (!file) return setSelectedFile(null)

    if (file.size <= 1024 * 1024 * 10) {
      const fileName = file.name.slice(0, file.name.lastIndexOf('.'))
      const fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)

      setName(fileName.trim())
      setExtension(fileExtension.toLowerCase().trim())
      setSelectedFile(file)
    } else {
      alert('File size exceeds 10MB')
      setSelectedFile(null)
      document.querySelector('input[type="file"]').value = ''
    }
  }

  const submitForm = event => {
    event.preventDefault()

    if (!selectedFile) return alert('No file selected')

    uploadFile({ category, name, extension, selectedFile })

    setCategory('')
    setName('')
    setExtension('')
    setSelectedFile(null)
  }

  return (
    <form className={style.file} onSubmit={submitForm} autoComplete="off">
      <div className={style.categoryWrap}>
        <div className={style.categoryBackground}>&nbsp;</div>

        <input
          className={style.category}
          type="text"
          value={category.toUpperCase()}
          dir="auto"
          placeholder="CATEGORY"
          maxLength="24"
          title="Optional"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))} // forces maxLength on mobile devices
        />
      </div>

      <input
        className={`${style.name} ${theme === 'dark' ? style.nameDark : ''}`}
        type="text"
        dir="auto"
        placeholder="Name"
        value={name}
        maxLength="60"
        required
        onChange={event => setName(event.target.value)}
      />

      <div className={style.extension} title={extension}>
        {extension}
      </div>

      <label htmlFor={`file-input-${props._id}`}>
        <img
          className={style.selectFile}
          src={uploadIcon}
          alt={selectedFile ? selectedFile.name : props.name || 'Upload a File'}
          title={selectedFile ? selectedFile.name : props.name || 'Upload a File'}
          onClick={() => {}}
        />
      </label>
      <input className={style.fileInput} id={`file-input-${props._id}`} type="file" onChange={fileHandler} />

      <input className={style.upload} type="submit" value="UPLOAD" />
    </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFile)
