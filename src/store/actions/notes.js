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
    dispatch({ type: LOADING, loading: true })

    if (localStorage.name) return ws.json({ type: 'getNotes' })

    const notes = JSON.parse(localStorage.notes || `[${JSON.stringify(exampleNote)}]`)

    batch(() => {
      dispatch({ type: SET_NOTES, notes })
      dispatch({ type: LOCAL_NOTES_SET })
      dispatch({ type: LOADING, loading: false })
    })
  }
}

export const setNotes = ({ notes }) => {
  return dispatch => {
    batch(() => {
      dispatch({ type: NOTES_FETCHED, status: true })
      dispatch({ type: SET_NOTES, notes })
      dispatch({ type: LOADING, loading: false })
    })
  }
}

export const createNote = newNote => {
  return async dispatch => {
    dispatch({ type: ADDING_NOTE, status: true })

    if (localStorage.name) return ws.json({ type: 'createNote', newNote })

    newNote = { ...newNote, _id: Date.now(), date: Date.now() }

    localStorage.setItem(
      'notes',
      JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), newNote] : [newNote]),
    )
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
    dispatch({ type: UPDATING_NOTE, noteID: updatedNote._id })

    if (localStorage.name) return ws.json({ type: 'updateNote', updatedNote })

    updatedNote.date = Date.now()
    localStorage.setItem(
      'notes',
      JSON.stringify(JSON.parse(localStorage.notes).map(note => (note._id === updatedNote._id ? updatedNote : note))),
    )
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
    dispatch({ type: DELETING_NOTE, noteID })

    if (localStorage.name) return ws.json({ type: 'deleteNote', noteID })

    localStorage.setItem('notes', JSON.stringify(JSON.parse(localStorage.notes).filter(note => note._id !== noteID)))
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
