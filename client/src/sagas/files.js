import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { FETCH_FILE } from '../store/actions/constants'
import * as actions from '../store/actions/index'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

function* fetchFile({ note }) {
  const { _id, fileName } = note

  yield put(actions.fetchingFile(_id))

  const { data } = yield axios.get(`${REACT_APP_SERVER_URL}/${_id}/file`, {
    responseType: 'blob',
  })

  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(new Blob([data]))
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  note.file = new Blob([data])

  yield put(actions.populateFile(note))
  yield put(actions.fetchingFile(''))
}

export default function* rootSaga() {
  yield takeLatest(FETCH_FILE, fetchFile)
}
