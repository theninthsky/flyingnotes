import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { filesSelector } from 'selectors'
import { File } from 'components'
import { Wrapper } from './style'

const Files = () => {
  const [files, setFiles] = useRecoilState(filesSelector)

  useEffect(() => {
    const getFiles = async () => {
      if (!ws) await createWebSocketConnection()

      const { files } = await ws.json({ type: 'getFiles' })

      setFiles(files)
    }

    if (!files.length) getFiles()
  }, [setFiles, files.length])

  return (
    <Wrapper>
      <File newFile />

      {files.map(file => (
        <File key={file._id} {...file} />
      ))}
    </Wrapper>
  )
}

export default Files
