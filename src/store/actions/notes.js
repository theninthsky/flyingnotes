import { batch } from 'react-redux'

import {
  LOADING,
  ERROR,
  SET_NOTES,
  ADDING_NOTE,
  ADD_NOTE,
  UPDATING_NOTE,
  UPDATE_NOTE,
  DELETING_NOTE,
  REMOVE_NOTE,
} from './actionTypes'
import { ws } from '../../socketConnection'

const exampleNote = {
  _id: 'example',
  category: 'Demo',
  title: 'Example',
  content: 'This is an example note.',
  date: Date.now(),
}

export const getNotes = () => {
  return async dispatch => {
    if (localStorage.name) return ws.json({ type: 'getNotes' })

    const notes = JSON.parse(localStorage.notes || `[${JSON.stringify(exampleNote)}]`)

    batch(() => {
      dispatch({ type: SET_NOTES, notes })
      dispatch({ type: LOADING, loading: false })
    })
  }
}

export const setNotes = ({ notes }) => {
  return dispatch => {
    batch(() => {
      dispatch({ type: SET_NOTES, notes })
      dispatch({ type: LOADING, loading: false })
    })
  }
}

export const createNote = newNote => {
  return async dispatch => {
    if (localStorage.name) {
      dispatch({ type: ADDING_NOTE, status: true })

      return ws.json({ type: 'createNote', newNote })
    }

    newNote = { ...newNote, _id: Date.now(), date: Date.now() }
    localStorage.setItem(
      'notes',
      JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), newNote] : [newNote]),
    )

    dispatch({ type: ADD_NOTE, newNote })
  }
}

export const addNote = ({ newNote }) => {
  return dispatch => {
    batch(() => {
      dispatch({ type: ADD_NOTE, newNote })
      dispatch({ type: ADDING_NOTE, status: false })
    })
  }
}

export const updateNote = updatedNote => {
  return async dispatch => {
    if (localStorage.name) {
      dispatch({ type: UPDATING_NOTE, noteID: updatedNote._id })

      return ws.json({ type: 'updateNote', updatedNote })
    }

    updatedNote.date = Date.now()
    localStorage.setItem(
      'notes',
      JSON.stringify(JSON.parse(localStorage.notes).map(note => (note._id === updatedNote._id ? updatedNote : note))),
    )

    dispatch({ type: UPDATE_NOTE, updatedNote })
  }
}

export const modifyNote = ({ updatedNote }) => {
  return dispatch => {
    batch(() => {
      dispatch({ type: UPDATE_NOTE, updatedNote })
      dispatch({ type: UPDATING_NOTE, noteID: '' })
    })
  }
}

export const deleteNote = noteID => {
  return async dispatch => {
    if (localStorage.name) {
      dispatch({ type: DELETING_NOTE, noteID })

      return ws.json({ type: 'deleteNote', noteID })
    }

    localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.notes).filter(note => note._id !== noteID)))

    dispatch({ type: REMOVE_NOTE, noteID })
  }
}

export const removeNote = ({ status, noteID }) => {
  return dispatch => {
    if (status === 'SUCCESS') {
      return batch(() => {
        dispatch({ type: DELETING_NOTE, noteID: '' })
        dispatch({ type: REMOVE_NOTE, noteID })
      })
    }

    dispatch({ type: ERROR, errorMessage: 'Error deleting note' })
  }
}
