import { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { saveFile } from 'util/base64'
import { downloadFile, deleteFile } from 'store/actions'
import { Wrapper, Category, Name, InfoWrap, Extension, Download, Delete } from './style'

import downloadIcon from 'assets/images/download.svg'
import deleteIcon from 'assets/images/delete.svg'

const File = ({ file: { _id, category, name, extension, attachment } }) => {
  const dispatch = useDispatch()
  const { downloadingFileID, deletingFileID } = useSelector(
    ({ app: { downloadingFileID, deletingFileID } }) => ({ downloadingFileID, deletingFileID }),
    shallowEqual,
  )

  const [showDelete, setShowDelete] = useState(false)

  const downloadFileHandler = () => {
    if (!attachment) return dispatch(downloadFile(_id))

    saveFile(name, extension, attachment)
  }

  return (
    <Wrapper
      deleting={deletingFileID === _id}
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
              if (window.confirm(`Delete ${name}.${extension}?`)) dispatch(deleteFile(_id))
            }}
          />
        ) : (
          <Extension title={extension}>{extension}</Extension>
        )}

        <Download
          downloading={downloadingFileID === _id}
          alt="Download"
          title="Download"
          src={downloadIcon}
          onClick={downloadFileHandler}
        />
      </InfoWrap>
    </Wrapper>
  )
}

export default File
