import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { ws } from 'websocketConnection'
import { fromBase64, saveFile } from 'util/base64'

import { Wrapper, Category, Name, InfoWrap, Extension, Download, Delete } from './style'
import { filesSelector } from 'selectors'
import downloadIcon from 'assets/images/download.svg'
import deleteIcon from 'assets/images/delete.svg'

const File = ({ file: { _id: fileID, category, name, extension } }) => {
  const [files, setFiles] = useRecoilState(filesSelector)

  const [attachment, setAttachment] = useState()
  const [showDelete, setShowDelete] = useState(false)

  const downloadFile = async () => {
    if (attachment) return saveFile(name, extension, attachment)

    // dispatch({ type: DOWNLOADING_FILE, fileID })

    const { base64 } = await ws.json({ type: 'downloadFile', fileID })
    const newAttachment = await fromBase64(name, base64)

    // dispatch({ type: DOWNLOADING_FILE, fileID: null })
    setAttachment(newAttachment)
    saveFile(name, extension, newAttachment)
  }

  const deleteFile = async () => {
    // dispatch({ type: DELETING_FILE, fileID })
    const { status } = await ws.json({ type: 'deleteFile', fileID })

    if (status === 'SUCCESS') setFiles(files.filter(({ _id }) => _id !== fileID))
    // dispatch({ type: DELETING_FILE, fileID: null })
  }

  return (
    <Wrapper
      /*deleting={deletingFileID === fileID}*/
      onMouseMove={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {category && <Category>{category.toUpperCase()}</Category>}

      <Name title={name}>{name}</Name>

      <InfoWrap>
        {showDelete ? (
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

        <Download
          /*downloading={downloadingFileID === fileID}*/
          alt="Download"
          title="Download"
          src={downloadIcon}
          onClick={downloadFile}
        />
      </InfoWrap>
    </Wrapper>
  )
}

export default File
