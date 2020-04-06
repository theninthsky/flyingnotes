import * as actionTypes from './actionTypes'

export const setNotes = notes => ({ type: actionTypes.SET_NOTES, notes })

export const fetchNotes = () => ({ type: actionTypes.FETCH_NOTES })

export const requestAddNote = newNote => ({
  type: actionTypes.REQUEST_ADD_NOTE,
  newNote,
})
export const addNote = newNote => ({ type: actionTypes.ADD_NOTE, newNote })

export const requestUpdateNote = updatedNote => ({
  type: actionTypes.REQUEST_UPDATE_NOTE,
  updatedNote,
})
export const updateNote = updatedNote => ({
  type: actionTypes.UPDATE_NOTE,
  updatedNote,
})

export const requestDeleteNote = noteID => ({
  type: actionTypes.REQUEST_DELETE_NOTE,
  noteID,
})
export const deleteNote = noteID => ({
  type: actionTypes.DELETE_NOTE,
  noteID,
})
