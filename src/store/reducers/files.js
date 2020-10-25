import { SET_FILES, ADD_FILE, ADD_ATTACHMENT } from '../actions/actionTypes'

const initialState = []

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      return action.files || []
    case ADD_FILE:
      return [...state, action.file]
    case ADD_ATTACHMENT:
      return state.map(file => (file._id === action.fileID ? { ...file, attachment: action.attachment } : file))
    default:
      return state
  }
}

export default filesReducer
