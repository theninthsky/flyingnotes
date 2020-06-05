import {
  SET_NOTES,
  FETCH_NOTES,
  REQUEST_ADD_NOTE,
  ADD_NOTE,
  REQUEST_UPDATE_NOTE,
  UPDATE_NOTE,
  REQUEST_DELETE_NOTE,
  DELETE_NOTE,
} from './constants'

export const setNotes = notes => ({ type: SET_NOTES, notes })

export const fetchNotes = () => ({ type: FETCH_NOTES })

export const requestAddNote = newNote => ({
  type: REQUEST_ADD_NOTE,
  newNote,
})
export const addNote = newNote => ({ type: ADD_NOTE, newNote })

export const requestUpdateNote = updatedNote => ({
  type: REQUEST_UPDATE_NOTE,
  updatedNote,
})
export const updateNote = updatedNote => ({
  type: UPDATE_NOTE,
  updatedNote,
})

export const requestDeleteNote = noteID => ({
  type: REQUEST_DELETE_NOTE,
  noteID,
})
export const deleteNote = noteID => ({
  type: DELETE_NOTE,
  noteID,
})
