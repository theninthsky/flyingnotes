import axios from 'axios'

import { SET_FILES } from './actionTypes'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

export const fetchFiles = () => {
  return async dispatch => {
    const {
      data: { files },
    } = await axios.get(`${REACT_APP_SERVER_URL}/files`)

    dispatch({ type: SET_FILES, files })
  }
}

export const uploadFile = ({ category, name, extension, selectedFile }) => {
  return async dispatch => {}
  // const formData = new FormData()
  // formData.append('category', category.trim())
  // formData.append('name', name.trim())
  // formData.append('extension', extension)
  // formData.append('file', selectedFile, selectedFile.name)
  // yield put(uploadingFile(true))
  // const {
  //   data: { newFile },
  // } = yield axios.post(`${REACT_APP_SERVER_URL}/files`, formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // })
  // yield put(addFile(newFile))
  // yield put(uploadingFile(false))
}

export const downloadFile = fileID => {
  return async dispatch => {}
  // yield put(downloadingFile(fileID))
  // const { data } = yield axios.post(
  //   `${REACT_APP_SERVER_URL}/file`,
  //   { fileID },
  //   {
  //     responseType: 'blob',
  //   },
  // )
  // yield put(downloadingFile(null))
  // yield put(addAttachment({ fileID, attachment: data }))
}
