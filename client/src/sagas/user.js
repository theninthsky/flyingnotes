import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as actionTypes from '../store/actions/actionTypes'
import * as actions from '../store/actions/index'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

function* register({ credentials }) {
  yield put(actions.loading(true))
  yield put(actions.clearError())
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
    yield put(actions.setName(name))
    yield put(actions.setNotes(notes))
    yield put(actions.notesFetched(true))
  } catch ({ response: { data } }) {
    yield put(actions.showError(data))
  }
  yield put(actions.loading(false))
}

function* login({ credentials }) {
  yield put(actions.loading(true))
  yield put(actions.clearError())
  try {
    const {
      data: { name, notes },
    } = yield axios.post(`${REACT_APP_SERVER_URL}/login`, credentials)
    localStorage.setItem('name', name)

    yield put(actions.setName(name))
    yield put(actions.setNotes(notes))
    yield put(actions.notesFetched(true))
  } catch ({ response: { data } }) {
    yield put(actions.showError(data))
  }
  yield put(actions.loading(false))
}

function* update({ credentials }) {
  yield put(actions.loading(true))
  yield put(actions.clearError())
  try {
    const {
      data: { name },
    } = yield axios.put(`${REACT_APP_SERVER_URL}/register`, credentials)
    localStorage.setItem('name', name)
    yield put(actions.setName(name))
  } catch ({ response: { data } }) {
    yield put(actions.showError(data))
  }
  yield put(actions.loading(false))
}

function* logout() {
  yield put(actions.loading(true))
  try {
    const { status } = yield axios.post(`${REACT_APP_SERVER_URL}/logout`)
    if (status === 200) {
      localStorage.removeItem('name')

      yield put(actions.setNotes(JSON.parse(localStorage.notes || '[]')))
      yield put(actions.logout())
    }
  } catch (err) {
    yield put(actions.showError(err))
  }
  yield put(actions.loading(false))
  yield put(actions.notesFetched(false))
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.REGISTER, register),
    takeLatest(actionTypes.LOGIN, login),
    takeLatest(actionTypes.UPDATE_USER, update),
    takeLatest(actionTypes.REQUEST_LOGOUT, logout),
  ])
}
