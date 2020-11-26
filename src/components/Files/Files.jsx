import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import NewFile from 'components/NewFile'
import File from 'components/File'
import { getFiles } from 'store/actions'
import { Wrapper } from './style'

const Files = () => {
  const files = useSelector(({ files }) => files)

  useEffect(() => {
    getFiles()
  }, [])

  return (
    <Wrapper>
      <NewFile />

      {files.map(file => (
        <File key={file._id} file={file} />
      ))}
    </Wrapper>
  )
}

export default Files
