import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'

// import NewFile from './NewFile/NewFile'
import File from './File/File'
import { getFiles } from '.././../store/actions'

import style from './Files.module.scss'

const mapStateToProp = state => ({ files: state.files })

const Files = ({ files }) => {
  useEffect(() => {
    getFiles()
  }, [])

  const sortedFiles = useMemo(() => [...files].sort((a, b) => new Date(b.date) - new Date(a.date)), [files])

  return (
    <div className={style.filesContainer}>
      {/* <NewFile /> */}

      {sortedFiles.map(file => (
        <File key={file._id} file={file} />
      ))}
    </div>
  )
}

export default connect(mapStateToProp)(Files)
