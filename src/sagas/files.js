import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { FETCH_FILE } from '../store/actions/constants'
import { fetchingFile, populateFile } from '../store/actions/index'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

function* handleFetchFile({ note }) {
  const { _id: noteID, fileName } = note

  yield put(fetchingFile(noteID))

  const { data } = yield axios.post(
    `${REACT_APP_SERVER_URL}/file`,
    { noteID },
    {
      responseType: 'blob',
    },
  )

  const link = document.createElement('a')

  link.href = window.URL.createObjectURL(new Blob([data]))
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  note.file = new Blob([data])

  yield put(populateFile(note))
  yield put(fetchingFile(''))
}

export default function* rootSaga() {
  yield takeLatest(FETCH_FILE, handleFetchFile)
}
