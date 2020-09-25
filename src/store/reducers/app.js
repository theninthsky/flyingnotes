import {
  CHANGE_THEME,
  LOADING,
  ERROR,
  ADDING_NOTE,
  UPDATING_NOTE,
  DELETING_NOTE,
  UPLOADING_FILE,
  DOWNLOADING_FILE,
} from '../actions/actionTypes'

const initialState = {
  theme: localStorage.theme || 'light',
  loading: true,
  addingNote: false,
  updatingNote: '', // recieves note id
  deletingNote: '', // recieves note id
  uploadingFile: false,
  downloadingFileID: null,
  errorMessage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.theme }
    case LOADING:
      return { ...state, loading: action.loading }
    case ERROR:
      return { ...state, errorMessage: action.errorMessage }
    case ADDING_NOTE:
      return { ...state, addingNote: action.status }
    case UPDATING_NOTE:
      return { ...state, updatingNote: action.noteID }
    case DELETING_NOTE:
      return { ...state, deletingNote: action.noteID }
    case UPLOADING_FILE:
      return { ...state, uploadingFile: action.bool }
    case DOWNLOADING_FILE:
      return { ...state, downloadingFileID: action.fileID }
    default:
      return state
  }
}
