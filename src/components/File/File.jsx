import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { fromBase64, saveFile } from 'util/base64'

import { Wrapper, Category, Name, InfoWrap, Extension, Download, Delete } from './style'
import { filesSelector } from 'selectors'
import downloadIcon from 'assets/images/download.svg'
import deleteIcon from 'assets/images/delete.svg'

const File = ({ file: { _id: fileID, category, name, extension } }) => {
  const [files, setFiles] = useRecoilState(filesSelector)

  const [attachment, setAttachment] = useState()
  const [deleteIsVisible, setDeleteIsVisible] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const downloadFile = async () => {
    if (attachment) return saveFile(name, extension, attachment)

    setDownloading(true)

    const { base64 } = await ws.json({ type: 'downloadFile', fileID })
    const fileAttachment = await fromBase64(name, base64)

    setDownloading(false)
    setAttachment(fileAttachment)
    saveFile(name, extension, fileAttachment)
  }

  const deleteFile = async () => {
    setDeleting(true)

    const { status } = await ws.json({ type: 'deleteFile', fileID })

    if (status === 'SUCCESS') setFiles(files.filter(({ _id }) => _id !== fileID))
  }

  return (
    <Wrapper
      deleting={deleting}
      onMouseMove={() => setDeleteIsVisible(true)}
      onMouseLeave={() => setDeleteIsVisible(false)}
    >
      {category && <Category>{category.toUpperCase()}</Category>}

      <Name title={name}>{name}</Name>

      <InfoWrap>
        {deleteIsVisible ? (
          <Delete
            src={deleteIcon}
            alt="Delete"
            title="Delete"
            onClick={() => {
              if (window.confirm(`Delete ${name}.${extension}?`)) deleteFile()
            }}
          />
        ) : (
          <Extension title={extension}>{extension}</Extension>
        )}

        <Download downloading={downloading} alt="Download" title="Download" src={downloadIcon} onClick={downloadFile} />
      </InfoWrap>
    </Wrapper>
  )
}

export default File
