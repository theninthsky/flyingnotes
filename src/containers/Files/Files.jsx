import { useSetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { filesState } from 'atoms'
import { useGetFiles } from 'hooks'
import { toBase64, fromBase64, saveFile } from 'util/base64'
import File from 'components/File'

import style from './Files.scss'

const Files = () => {
  const files = useGetFiles()

  const setFiles = useSetRecoilState(filesState)

  const uploadFile = async (selectedFile, name, extension) => {
    const base64 = await toBase64(selectedFile)
    const { file } = await ws.json({ type: 'uploadFile', file: { name, extension, base64 } })

    setFiles([...files, file])
  }

  const downloadFile = async (fileID, name, extension) => {
    const { base64 } = await ws.json({ type: 'downloadFile', fileID })
    const fileAttachment = await fromBase64(name, base64)

    saveFile(name, extension, fileAttachment)

    return fileAttachment
  }

  const deleteFile = async fileID => {
    const { status } = await ws.json({ type: 'deleteFile', fileID })

    if (status === 'SUCCESS') setFiles(files.filter(({ _id }) => _id !== fileID))
  }

  return (
    <div className={style.wrapper}>
      <File newFile onUploadFile={uploadFile} />

      {files.map(file => (
        <File key={file._id} {...file} onDownloadFile={downloadFile} onDeleteFile={deleteFile} />
      ))}
    </div>
  )
}

export default Files
