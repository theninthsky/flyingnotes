import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { FETCH_NOTES, REQUEST_ADD_NOTE, REQUEST_UPDATE_NOTE, REQUEST_DELETE_NOTE } from '../store/actions/constants'
import {
  loading,
  notesFetched,
  localNotesSet,
  setNotes,
  addingNote,
  addNote,
  updatingNote,
  updateNote,
  deletingNote,
  deleteNote,
  showError,
} from '../store/actions'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

const exampleNote = {
  _id: 'example',
  category: 'Demo',
  title: 'Example',
  content: 'This is an example note.',
  date: Date.now(),
}

function* handleFetchNotes() {
  try {
    yield put(loading(true))
    let notes

    if (localStorage.name) {
      const { data } = yield axios.get(`${REACT_APP_SERVER_URL}/notes`)

      notes = data.notes
      yield put(notesFetched(true))
    } else {
      notes = JSON.parse(localStorage.notes || `[${JSON.stringify(exampleNote)}]`)

      yield put(localNotesSet())
    }

    yield put(setNotes(notes))
    yield put(loading(false))
  } catch (err) {
    localStorage.removeItem('name')
    window.location.reload()
  }
}

function* handleAddNote({ newNote }) {
  yield put(addingNote(true))

  if (localStorage.name) {
    const { data } = yield axios.post(`${REACT_APP_SERVER_URL}/notes`, newNote)

    newNote = data.newNote
  } else {
    newNote = { ...newNote, _id: Date.now(), date: Date.now() }
    localStorage.setItem(
      'notes',
      JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), newNote] : [newNote]),
    )
  }

  yield put(addNote(newNote))
  yield put(addingNote(false))
}

function* handleUpdateNote({ updatedNote }) {
  yield put(updatingNote(updatedNote._id))

  if (localStorage.name) {
    const { data } = yield axios.put(`${REACT_APP_SERVER_URL}/notes`, updatedNote)

    updatedNote = data.updatedNote
  } else {
    updatedNote.date = Date.now()
    localStorage.setItem(
      'notes',
      JSON.stringify(JSON.parse(localStorage.notes).map(note => (note._id === updatedNote._id ? updatedNote : note))),
    )
  }

  yield put(updateNote(updatedNote))
  yield put(updatingNote(''))
}

function* handleDeleteNote({ noteID }) {
  yield put(deletingNote(noteID))

  if (localStorage.name) {
    try {
      yield axios.delete(`${REACT_APP_SERVER_URL}/notes`, {
        data: { noteID },
      })
    } catch (err) {
      noteID = ''

      yield put(showError(err))
    }
  } else {
    localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.notes).filter(note => note._id !== noteID)))
  }

  yield put(deleteNote(noteID))
  yield put(deletingNote(''))
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_NOTES, handleFetchNotes),
    takeLatest(REQUEST_ADD_NOTE, handleAddNote),
    takeLatest(REQUEST_UPDATE_NOTE, handleUpdateNote),
    takeLatest(REQUEST_DELETE_NOTE, handleDeleteNote),
  ])
}
