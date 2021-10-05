import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useHistory } from 'react-router-dom'
import { useAxios } from 'frontend-essentials'

import { userLoggedInSelector } from 'containers/App/selectors'
import { filesState } from './atoms'
import { toBase64, fromBase64, saveFile } from 'util/base64'
import File from 'components/File'

import style from './Files.scss'

const { SERVER_URL } = process.env

const Files = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [files, setFiles] = useRecoilState(filesState)

  const history = useHistory()

  useAxios({
    url: `${SERVER_URL}/files`,
    method: 'get',
    onSuccess: ({ data }) => setFiles(data)
  })

  const { activate: uploadFile } = useAxios({
    url: `${SERVER_URL}/files`,
    method: 'post',
    manual: true,
    onSuccess: ({ data }) => setFiles(files => [...files, data])
  })
  const { activate: downloadFile } = useAxios({
    url: `${SERVER_URL}/download`,
    method: 'post',
    manual: true
  })
  const { activate: deleteFile } = useAxios({
    url: `${SERVER_URL}/file`,
    method: 'delete',
    manual: true,
    onError: () => setFiles(files)
  })

  useEffect(() => {
    if (!userLoggedIn) history.replace('/')
  }, [history, userLoggedIn])

  const onUploadFile = async (selectedFile, name, extension) => {
    const base64 = await toBase64(selectedFile)

    uploadFile({ data: { name, extension, base64 } })
  }

  const onDownloadFile = (fileID, name, extension) => {
    downloadFile({
      data: { fileID },
      onSuccess: async ({ data: { base64 } }) => {
        const fileAttachment = await fromBase64(name, base64)

        saveFile(name, extension, fileAttachment)
      }
    })

    // return fileAttachment
  }

  const onDeleteFile = fileID => {
    deleteFile({ data: { fileID } })
    setFiles(files.filter(({ _id }) => _id !== fileID))
  }

  return (
    <div className={style.wrapper}>
      <File newFile onUploadFile={onUploadFile} />

      {files.map(file => (
        <File key={file._id} {...file} onDownloadFile={onDownloadFile} onDeleteFile={onDeleteFile} />
      ))}
    </div>
  )
}

export default Files
