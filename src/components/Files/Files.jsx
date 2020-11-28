import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { ws } from 'websocketConnection'
import { filesSelector } from 'selectors'
import NewFile from 'components/NewFile'
import File from 'components/File'
import { Wrapper } from './style'

const Files = () => {
  const [files, setFiles] = useRecoilState(filesSelector)

  useEffect(() => {
    const getFiles = async () => {
      const { files } = await ws.json({ type: 'getFiles' })

      setFiles(files)
    }

    if (!files.length) setTimeout(getFiles, 1000)
  }, [setFiles, files.length])

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
