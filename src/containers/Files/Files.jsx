import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useHistory } from 'react-router-dom'
import { useAxios } from 'frontend-essentials'

import { userLoggedInSelector } from 'containers/App/selectors'
import { filesSelector } from './selectors'
import File from 'components/File'

import style from './Files.scss'

const Files = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [files, setFiles] = useRecoilState(filesSelector)

  const history = useHistory()

  useAxios({
    url: '/files',
    method: 'get',
    onSuccess: ({ data }) => setFiles(data)
  })
  const { activate: deleteFile } = useAxios({
    url: '/file',
    method: 'delete',
    manual: true,
    onError: () => setFiles(files)
  })

  useEffect(() => {
    if (!userLoggedIn) history.replace('/')
  }, [history, userLoggedIn])

  const onDeleteFile = fileID => {
    deleteFile({ data: { fileID } })
    setFiles(files.filter(({ _id }) => _id !== fileID))
  }

  return (
    <div className={style.wrapper}>
      <File newFile addFile={data => setFiles(files => [...files, data])} />

      {files.map(file => (
        <File key={file._id} {...file} onDeleteFile={onDeleteFile} />
      ))}
    </div>
  )
}

export default Files
