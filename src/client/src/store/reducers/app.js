import * as actionTypes from '../actions/actionTypes'

const initialState = {
  theme: localStorage.theme || 'light',
  loading: false,
  notesFetched: false,
  localNotesSet: false,
  addingNote: false,
  updatingNote: '', // recieves note id
  deletingNote: '', // recieves note id
  fetchingFile: '', // recieves note id
  errorMessage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return { ...state, theme: action.theme }
    case actionTypes.LOADING:
      return { ...state, loading: action.loading }
    case actionTypes.ERROR:
      return { ...state, errorMessage: action.errorMessage }
    case actionTypes.NOTES_FETCHED:
      return { ...state, notesFetched: action.status }
    case actionTypes.LOCAL_NOTES_SET:
      return { ...state, localNotesSet: true }
    case actionTypes.ADDING_NOTE:
      return { ...state, addingNote: action.status }
    case actionTypes.UPDATING_NOTE:
      return { ...state, updatingNote: action.noteID }
    case actionTypes.DELETING_NOTE:
      return { ...state, deletingNote: action.noteID }
    case actionTypes.FETCHING_FILE:
      return { ...state, fetchingFile: action.noteID }

    default:
      return state
  }
}
