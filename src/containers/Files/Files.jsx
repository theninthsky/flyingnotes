import { useEffect, memo } from 'react'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

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

const Files = ({ user, storage, files, getFiles }) => {
  useEffect(() => {
    getFiles()
  }, [])

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

export default memo(Files)
