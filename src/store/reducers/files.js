import { SET_FILES, ADD_FILE, ADD_ATTACHMENT, REMOVE_FILE } from '../actions/actionTypes'

const initialState = []

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      return state.length ? state : action.files || []
    case ADD_FILE:
      return [...state, action.file]
    case ADD_ATTACHMENT:
      return state.map(file => (file._id === action.fileID ? { ...file, attachment: action.attachment } : file))
    case REMOVE_FILE:
      return state.filter(file => file._id !== action.fileID)
    default:
      return state
  }
}

export default filesReducer
