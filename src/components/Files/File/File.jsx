import { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { saveFile } from '../../../util/base64'
import { downloadFile, deleteFile } from '../../../store/actions'

import downloadIcon from '../../../assets/images/download.svg'
import deleteIcon from '../../../assets/images/delete.svg'

// #region Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 34px;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isBeingDeleted }) => (isBeingDeleted ? '0.5' : '1')};
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  transition: 0.2s;
  animation: showFile 0.5s;

  &:hover {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes showFile {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 10px 0;
  }
`
const Category = styled.div`
  width: 25%;
  padding: 9px 5px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(150, 150, 150);
  background-color: #ffffde;

  @media (max-width: 480px) {
    max-width: 40%;
  }
`
const Name = styled.h1`
  max-width: 100%;
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: normal;
`
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 15%;
  height: 100%;
`
const Extension = styled.div`
  @media (max-width: 480px) {
    font-size: 12px;
  }
`
const Download = styled.img`
  width: 15px;
  cursor: ${({ downloading }) => (downloading ? 'default' : 'pointer')};
  pointer-events: ${({ downloading }) => (downloading ? 'none' : 'auto')};
  animation: ${({ downloading }) => (downloading ? 'loading 0.75s infinite alternate' : 'none')};

  &:hover {
    opacity: 0.5;
  }

  @keyframes loading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.25;
    }
  }
`
const Delete = styled.img`
  width: 14px;
  opacity: 1;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
// #endregion

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
      isBeingDeleted={deletingFileID === _id}
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
