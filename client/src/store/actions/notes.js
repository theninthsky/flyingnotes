import { batch } from 'react-redux'
import axios from 'axios'

import * as actionTypes from './actionTypes'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

const exampleNote = {
  _id: 'example',
  color: '#8e44ad',
  category: 'Demo',
  title: 'Example',
  content: 'This is an example note.',
  date: Date.now()
}

export const fetchNotes = () => {
  return async dispatch => {
    dispatch({ type: actionTypes.LOADING, loading: true })
    let notes
    if (localStorage.name) {
      const { data } = await axios.get(`${REACT_APP_SERVER_URL}/notes`)
      notes = data.notes
      dispatch({ type: actionTypes.NOTES_FETCHED })
    } else {
      notes = JSON.parse(
        localStorage.notes || `[${JSON.stringify(exampleNote)}]`
      )
      dispatch({ type: actionTypes.LOCAL_NOTES_SET })
    }
    batch(() => {
      dispatch({ type: actionTypes.SET_NOTES, notes })
      dispatch({ type: actionTypes.LOADING, loading: false })
    })
  }
}

export const addNote = newNote => {
  return async dispatch => {
    dispatch({ type: actionTypes.ADDING_NOTE, status: true })
    if (localStorage.name) {
      const { data } = await axios.post(`${REACT_APP_SERVER_URL}/notes`, {
        newNote
      })
      newNote = data.newNote
    } else {
      newNote = { ...newNote, _id: Date.now(), date: Date.now() }
      localStorage.setItem(
        'notes',
        JSON.stringify(
          localStorage.notes
            ? [...JSON.parse(localStorage.notes), newNote]
            : [newNote]
        )
      )
    }
    batch(() => {
      dispatch({ type: actionTypes.ADD_NOTE, newNote })
      dispatch({ type: actionTypes.ADDING_NOTE, status: false })
    })
  }
}

export const updateNote = updatedNote => {
  return async dispatch => {
    dispatch({ type: actionTypes.UPDATING_NOTE, noteId: updatedNote._id })
    if (localStorage.name) {
      const { data } = await axios.put(`${REACT_APP_SERVER_URL}/notes`, {
        updatedNote
      })
      updatedNote = data.updatedNote
    } else {
      updatedNote.date = Date.now()
      localStorage.setItem(
        'notes',
        JSON.stringify(
          JSON.parse(localStorage.notes).map(note =>
            note._id === updatedNote._id ? updatedNote : note
          )
        )
      )
    }
    batch(() => {
      dispatch({ type: actionTypes.UPDATE_NOTE, updatedNote })
      dispatch({ type: actionTypes.UPDATING_NOTE, noteId: '' })
    })
  }
}

export const deleteNote = noteId => {
  return async dispatch => {
    dispatch({ type: actionTypes.DELETING_NOTE, noteId })
    if (localStorage.name) {
      const { status } = await axios.delete(`${REACT_APP_SERVER_URL}/notes`, {
        data: { noteId }
      })
      if (status !== 200) {
        noteId = ''
      }
    } else {
      localStorage.setItem(
        'notes',
        JSON.stringify(
          JSON.parse(localStorage.notes).filter(note => note._id !== noteId)
        )
      )
    }
    batch(() => {
      dispatch({ type: actionTypes.DELETE_NOTE, noteId })
      dispatch({ type: actionTypes.DELETING_NOTE, noteId: '' })
    })
  }
}
