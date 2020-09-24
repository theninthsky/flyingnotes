import { SET_NOTES, ADD_NOTE, UPDATE_NOTE, REMOVE_NOTE } from '../actions/actionTypes'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      return action.notes || []
    case ADD_NOTE:
      return [...state, action.newNote]
    case UPDATE_NOTE:
      return state.map(note => (note._id === action.updatedNote._id ? action.updatedNote : note))
    case REMOVE_NOTE:
      return state.filter(note => (note._id || note.date) !== action.noteID)
    default:
      return state
  }
}
