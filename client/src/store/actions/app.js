import * as actionTypes from './actionTypes'

export const loading = state => ({
  type: actionTypes.LOADING,
  loading: state,
})

export const requestChangeTheme = () => ({
  type: actionTypes.REQUEST_CHANGE_THEME,
})
export const changeTheme = theme => ({
  type: actionTypes.CHANGE_THEME,
  theme,
})

export const showError = errorMessage => ({
  type: actionTypes.ERROR,
  errorMessage,
})

export const clearError = () => ({
  type: actionTypes.ERROR,
  errorMessage: false,
})

export const notesFetched = status => ({
  type: actionTypes.NOTES_FETCHED,
  status,
})

export const localNotesSet = () => ({ type: actionTypes.LOCAL_NOTES_SET })

export const addingNote = status => ({
  type: actionTypes.ADDING_NOTE,
  status,
})

export const updatingNote = noteID => ({
  type: actionTypes.UPDATING_NOTE,
  noteID,
})

export const deletingNote = noteID => ({
  type: actionTypes.DELETING_NOTE,
  noteID,
})

export const fetchingFile = noteID => ({
  type: actionTypes.FETCHING_FILE,
  noteID,
})
