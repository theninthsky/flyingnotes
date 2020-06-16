import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { REGISTER, LOGIN, UPDATE, CHANGE_PASSWORD, LOGOUT } from '../store/actions/constants'
import { loading, clearError, setName, setNotes, notesFetched, showError } from '../store/actions/index'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

function* handleRegister({ credentials }) {
  yield put(loading(true))
  yield put(clearError())
  try {
    const {
      data: { name, notes },
    } = yield axios.post(`${REACT_APP_SERVER_URL}/register`, {
      ...credentials,
      notes: localStorage.notes
        ? JSON.parse(localStorage.notes).map(note => ({ ...note, _id: null })) // _id is removed to prevent ObjectId errors on server side
        : [],
    })

    localStorage.clear()
    localStorage.setItem('name', name)

    yield put(setName(name))
    yield put(setNotes(notes))
    yield put(notesFetched(true))
  } catch ({ response: { data } }) {
    yield put(showError(data))
  }
  yield put(loading(false))
}

function* handleLogin({ credentials }) {
  yield put(loading(true))
  yield put(clearError())

  try {
    const {
      data: { name, notes },
    } = yield axios.post(`${REACT_APP_SERVER_URL}/login`, credentials)
    localStorage.setItem('name', name)

    yield put(setName(name))
    yield put(setNotes(notes))
    yield put(notesFetched(true))
  } catch ({ response: { data } }) {
    yield put(showError(data))
  }

  yield put(loading(false))
}

function* handleUpdate({ name }) {
  yield axios.put(`${REACT_APP_SERVER_URL}/update`, { name })
  localStorage.setItem('name', name)
  yield put(setName(name))
}

function* handleChangePassword({ passwords }) {
  yield put(loading(true))
  yield put(clearError())
  try {
    yield axios.put(`${REACT_APP_SERVER_URL}/register`, passwords)
  } catch ({ response: { data } }) {
    yield put(showError(data))
  }
  yield put(loading(false))
}

function* handleLogout() {
  yield put(loading(true))
  try {
    yield axios.post(`${REACT_APP_SERVER_URL}/logout`)

    localStorage.removeItem('name')

    yield put(setNotes(JSON.parse(localStorage.notes || '[]')))
    yield put(setName(null))
  } catch (err) {
    yield put(showError(err))
  }
  yield put(loading(false))
  yield put(notesFetched(false))
}

export default function* rootSaga() {
  yield all([
    takeLatest(REGISTER, handleRegister),
    takeLatest(LOGIN, handleLogin),
    takeLatest(UPDATE, handleUpdate),
    takeLatest(CHANGE_PASSWORD, handleChangePassword),
    takeLatest(LOGOUT, handleLogout),
  ])
}
