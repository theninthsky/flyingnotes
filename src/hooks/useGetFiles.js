import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { filesSelector } from 'selectors'

export const useGetFiles = () => {
  const [files, setFiles] = useRecoilState(filesSelector)

  useEffect(() => {
    const getFiles = async () => {
      if (!ws) await createWebSocketConnection()

      const { files } = await ws.json({ type: 'getFiles' })

      setFiles(files)
    }

    getFiles()
  }, [setFiles])

  return files
}
