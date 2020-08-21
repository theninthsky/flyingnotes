import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { FETCH_FILES, UPLOAD_FILE, DOWNLOAD_FILE } from '../store/actions/constants'
import { setFiles, addFile, uploadingFile, downloadingFile, addAttachment } from '../store/actions'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

function* fetchFiles() {
  const {
    data: { files },
  } = yield axios.get(`${REACT_APP_SERVER_URL}/files`)

  yield put(setFiles(files))
}

function* uploadFile({ file: { category, name, extension, selectedFile } }) {
  const formData = new FormData()

  formData.append('category', category.trim())
  formData.append('name', name.trim())
  formData.append('extension', extension)
  formData.append('file', selectedFile, selectedFile.name)

  yield put(uploadingFile(true))

  const {
    data: { newFile },
  } = yield axios.post(`${REACT_APP_SERVER_URL}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  yield put(addFile(newFile))
  yield put(uploadingFile(false))
}

function* downloadFile({ fileID }) {
  yield put(downloadingFile(fileID))

  const { data } = yield axios.post(
    `${REACT_APP_SERVER_URL}/file`,
    { fileID },
    {
      responseType: 'blob',
    },
  )

  yield put(downloadingFile(null))
  yield put(addAttachment({ fileID, attachment: data }))
}

export default function* rootSaga() {
  yield takeLatest(FETCH_FILES, fetchFiles)
  yield takeLatest(UPLOAD_FILE, uploadFile)
  yield takeLatest(DOWNLOAD_FILE, downloadFile)
}
