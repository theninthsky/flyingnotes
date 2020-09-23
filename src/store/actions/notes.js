import axios from 'axios'
import { batch } from 'react-redux'

import {
  LOADING,
  ERROR,
  NOTES_FETCHED,
  LOCAL_NOTES_SET,
  SET_NOTES,
  ADDING_NOTE,
  ADD_NOTE,
  UPDATING_NOTE,
  UPDATE_NOTE,
  DELETING_NOTE,
  DELETE_NOTE,
} from './actionTypes'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

const exampleNote = {
  _id: 'example',
  category: 'Demo',
  title: 'Example',
  content: 'This is an example note.',
  date: Date.now(),
}

export const fetchNotes = () => {
  return async dispatch => {
    dispatch({ type: LOADING, loading: true })
    let notes

    if (localStorage.name) {
      const { data } = await axios.get(`${REACT_APP_SERVER_URL}/notes`)

      notes = data.notes
      dispatch({ type: NOTES_FETCHED, status: true })
    } else {
      notes = JSON.parse(localStorage.notes || `[${JSON.stringify(exampleNote)}]`)

      dispatch({ type: LOCAL_NOTES_SET })
    }

    batch(() => {
      dispatch({ type: SET_NOTES, notes })
      dispatch({ type: LOADING, loading: false })
    })
  }
}

export const addNote = newNote => {
  return async dispatch => {
    dispatch({ type: ADDING_NOTE, status: true })

    if (localStorage.name) {
      const { data } = await axios.post(`${REACT_APP_SERVER_URL}/notes`, newNote)

      newNote = data.newNote
    } else {
      newNote = { ...newNote, _id: Date.now(), date: Date.now() }
      localStorage.setItem(
        'notes',
        JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), newNote] : [newNote]),
      )
    }

    batch(() => {
      dispatch({ type: ADD_NOTE, newNote })
      dispatch({ type: ADDING_NOTE, status: false })
    })
  }
}

export const updateNote = updatedNote => {
  return async dispatch => {
    dispatch({ type: UPDATING_NOTE, noteID: updatedNote._id })

    if (localStorage.name) {
      const { data } = await axios.put(`${REACT_APP_SERVER_URL}/notes`, updatedNote)

      updatedNote = data.updatedNote
    } else {
      updatedNote.date = Date.now()
      localStorage.setItem(
        'notes',
        JSON.stringify(JSON.parse(localStorage.notes).map(note => (note._id === updatedNote._id ? updatedNote : note))),
      )
    }

    batch(() => {
      dispatch({ type: UPDATE_NOTE, updatedNote })
      dispatch({ type: UPDATING_NOTE, noteID: '' })
    })
  }
}

export const deleteNote = noteID => {
  return async dispatch => {
    dispatch({ type: DELETING_NOTE, noteID })

    if (localStorage.name) {
      try {
        await axios.delete(`${REACT_APP_SERVER_URL}/notes`, {
          data: { noteID },
        })
      } catch ({ response: { data } }) {
        noteID = ''

        dispatch({ type: ERROR, errorMessage: data })
      }
    } else {
      localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.notes).filter(note => note._id !== noteID)))
    }

    batch(() => {
      dispatch({ type: DELETE_NOTE, noteID })
      dispatch({ type: DELETING_NOTE, noteID: '' })
    })
  }
}
