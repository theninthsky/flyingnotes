import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { ref, listAll, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

import { storage } from 'firebase-app'
import { userState } from 'containers/App/atoms'
import File from 'components/File'

import style from './Files.scss'

const saveFile = (blob, name) => {
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const Files = () => {
  const user = useRecoilValue(userState)

  const [listRef, setListRef] = useState()
  const [files, setFiles] = useState([])

  const navigate = useNavigate()

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

  const onUpload = async (file, reset) => {
    const storageRef = ref(storage, `${user.uid}/${file.name}`)

    await uploadBytes(storageRef, file)
    await getFiles()
    reset()
  }

  const onDownload = async (itemRef, name, extension) => {
    const url = await getDownloadURL(itemRef)
    const res = await fetch(url)
    const blob = await res.blob()

    saveFile(blob, `${name}.${extension}`)
  }

  const onDelete = async itemRef => {
    await deleteObject(itemRef)
    getFiles()
  }

  return (
    <div className={style.wrapper}>
      <File newFile onUpload={onUpload} />

      {files.map(({ itemRef, id, name, extension }) => (
        <File
          key={id}
          name={name}
          extension={extension}
          onDownload={() => onDownload(itemRef, name, extension)}
          onDelete={() => onDelete(itemRef)}
        />
      ))}
    </div>
  )
}

export default Files
