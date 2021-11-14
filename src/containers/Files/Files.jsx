import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { ref, listAll, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { useAxios } from 'frontend-essentials'

import { storage } from 'firebase-app'
import { userState } from 'containers/App/atoms'
import File from 'components/File'

import style from './Files.scss'

const Files = () => {
  const user = useRecoilValue(userState)

  const [listRef, setListRef] = useState()
  const [files, setFiles] = useState([])

  const navigate = useNavigate()

  const { activate: deleteFile } = useAxios({
    url: '/file',
    method: 'delete',
    manual: true,
    onError: () => setFiles(files)
  })

  useEffect(() => {
    if (!user) navigate('/', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    setListRef(user ? ref(storage, user.uid) : undefined)
  }, [user])

  useEffect(() => {
    listRef ? getFiles() : setFiles([])
  }, [listRef])

  const getFiles = async () => {
    const { items } = await listAll(listRef)

    setFiles(
      items.map(item => {
        const [name, extension] = item.name.split('.')

        return { itemRef: item, id: item.name, name, extension }
      })
    )
  }

  const onUploadFile = async (file, reset) => {
    const storageRef = ref(storage, `${user.uid}/${file.name}`)

    await uploadBytes(storageRef, file)
    await getFiles()
    reset()
  }

  const onDownloadFile = async itemRef => {
    const url = await getDownloadURL(itemRef)
    fetch(url)
  }

  const onDeleteFile = async itemRef => {
    await deleteObject(itemRef)
    getFiles()
  }

  return (
    <div className={style.wrapper}>
      <File newFile onUploadFile={onUploadFile} />

      {files.map(({ itemRef, id, name, extension }) => (
        <File
          key={id}
          id={id}
          name={name}
          extension={extension}
          onDownloadFile={() => onDownloadFile(itemRef)}
          onDeleteFile={() => onDeleteFile(itemRef)}
        />
      ))}
    </div>
  )
}

export default Files
