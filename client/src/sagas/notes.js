import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as actionTypes from '../store/actions/actionTypes'
import * as actions from '../store/actions/index'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

const exampleNote = {
  _id: 'example',
  color: '#8e44ad',
  category: 'Demo',
  title: 'Example',
  content: 'This is an example note.',
  date: Date.now(),
}

function* fetchNotes() {
  try {
    yield put(actions.loading(true))
    let notes
    if (localStorage.name) {
      const { data } = yield axios.get(`${REACT_APP_SERVER_URL}/notes`)
      notes = data.notes
      yield put(actions.notesFetched(true))
    } else {
      notes = JSON.parse(
        localStorage.notes || `[${JSON.stringify(exampleNote)}]`,
      )
      yield put(actions.localNotesSet())
    }

    yield put(actions.setNotes(notes))
    yield put(actions.loading(false))
  } catch (err) {
    localStorage.removeItem('name')
    window.location.reload()
  }
}

function* addNote({ newNote }) {
  yield put(actions.addingNote(true))
  if (localStorage.name) {
    const { data } = yield axios.post(
      `${REACT_APP_SERVER_URL}/notes`,
      newNote,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    newNote = data.newNote
  } else {
    newNote = { ...newNote, _id: Date.now(), date: Date.now() }
    localStorage.setItem(
      'notes',
      JSON.stringify(
        localStorage.notes
          ? [...JSON.parse(localStorage.notes), newNote]
          : [newNote],
      ),
    )
  }

  yield put(actions.addNote(newNote))
  yield put(actions.addingNote(false))
}

function* updateNote({ updatedNote }) {
  yield put(actions.updatingNote(updatedNote.get('_id')))
  if (localStorage.name) {
    const { data } = yield axios.put(
      `${REACT_APP_SERVER_URL}/notes`,
      updatedNote,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    updatedNote = data.updatedNote
  } else {
    updatedNote.date = Date.now()
    localStorage.setItem(
      'notes',
      JSON.stringify(
        JSON.parse(localStorage.notes).map(note =>
          note._id === updatedNote._id ? updatedNote : note,
        ),
      ),
    )
  }

  yield put(actions.updateNote(updatedNote))
  yield put(actions.updatingNote(''))
}

function* deleteNote({ noteID }) {
  yield put(actions.deletingNote(noteID))
  if (localStorage.name) {
    try {
      yield axios.delete(`${REACT_APP_SERVER_URL}/notes`, {
        data: { noteID },
      })
    } catch (err) {
      noteID = ''
      yield put(actions.showError(err))
    }
  } else {
    localStorage.setItem(
      'notes',
      JSON.stringify(
        JSON.parse(localStorage.notes).filter(note => note._id !== noteID),
      ),
    )
  }

  yield put(actions.deleteNote(noteID))
  yield put(actions.deletingNote(''))
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_NOTES, fetchNotes),
    takeLatest(actionTypes.REQUEST_ADD_NOTE, addNote),
    takeLatest(actionTypes.REQUEST_UPDATE_NOTE, updateNote),
    takeLatest(actionTypes.REQUEST_DELETE_NOTE, deleteNote),
  ])
}
