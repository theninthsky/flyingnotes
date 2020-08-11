import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import NewFile from './NewFile/NewFile'
import File from './File/File'
import { fetchFiles } from '.././../store/actions'

import style from './Files.module.scss'

const mapStateToProp = state => ({ files: state.files })

const mapDispatchToProps = { fetchFiles }

const Files = ({ files, fetchFiles }) => {
  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  return (
    <div className={style.filesContainer}>
      <NewFile />

      {files.map(file => (
        <File key={file._id} file={file} />
      ))}
    </div>
  )
}

export default connect(mapStateToProp, mapDispatchToProps)(Files)
