import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { saveFile } from '../../../util/base64'
import { downloadFile } from '../../../store/actions'

import downloadIcon from '../../../assets/images/download.svg'

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
  cursor: pointer;
  animation: ${({ downloading }) => (downloading ? 'loading 0.5s infinite alternate' : 'none')};

  &:hover {
    opacity: 0.5;
  }

  @keyframes loading {
    from {
      opacity: 0.25;
    }
    to {
      opacity: 0.75;
    }
  }
`
// #endregion

const File = ({ file: { _id, category, name, extension, attachment } }) => {
  const dispatch = useDispatch()
  const downloadingFileID = useSelector(({ app }) => app.downloadingFileID)

  const downloadFileHandler = () => {
    if (!attachment) return dispatch(downloadFile(_id))

    saveFile(name, extension, attachment)
  }

  return (
    <Wrapper /*onMouseMove={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(showConfirmMessage)} */>
      {category && <Category>{category.toUpperCase()}</Category>}

      <Name title={name}>{name}</Name>

      <InfoWrap>
        <Extension title={extension}>{extension}</Extension>

        <Download
          downloading={downloadingFileID === _id}
          alt="Download"
          src={downloadIcon}
          onClick={downloadFileHandler}
        />
      </InfoWrap>
    </Wrapper>
  )
}

export default File
