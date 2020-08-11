import {
  CHANGE_THEME,
  LOADING,
  ERROR,
  NOTES_FETCHED,
  LOCAL_NOTES_SET,
  ADDING_NOTE,
  UPDATING_NOTE,
  DELETING_NOTE,
  DOWNLOADING_FILE,
} from '../actions/constants'

const initialState = {
  theme: localStorage.theme || 'light',
  loading: false,
  notesFetched: false,
  localNotesSet: false,
  addingNote: false,
  updatingNote: '', // recieves note id
  deletingNote: '', // recieves note id
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
    case NOTES_FETCHED:
      return { ...state, notesFetched: action.status }
    case LOCAL_NOTES_SET:
      return { ...state, localNotesSet: true }
    case ADDING_NOTE:
      return { ...state, addingNote: action.status }
    case UPDATING_NOTE:
      return { ...state, updatingNote: action.noteID }
    case DELETING_NOTE:
      return { ...state, deletingNote: action.noteID }
    case DOWNLOADING_FILE:
      return { ...state, downloadingFileID: action.fileID }
    default:
      return state
  }
}
