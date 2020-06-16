import {
  LOADING,
  REQUEST_CHANGE_THEME,
  CHANGE_THEME,
  ERROR,
  NOTES_FETCHED,
  LOCAL_NOTES_SET,
  ADDING_NOTE,
  UPDATING_NOTE,
  DELETING_NOTE,
  FETCHING_FILE,
} from './constants'

export const loading = state => ({
  type: LOADING,
  loading: state,
})

export const requestChangeTheme = () => ({
  type: REQUEST_CHANGE_THEME,
})
export const changeTheme = theme => ({
  type: CHANGE_THEME,
  theme,
})

export const showError = errorMessage => ({
  type: ERROR,
  errorMessage,
})

export const clearError = () => ({
  type: ERROR,
  errorMessage: false,
})

export const notesFetched = status => ({
  type: NOTES_FETCHED,
  status,
})

export const localNotesSet = () => ({ type: LOCAL_NOTES_SET })

export const addingNote = status => ({
  type: ADDING_NOTE,
  status,
})

export const updatingNote = noteID => ({
  type: UPDATING_NOTE,
  noteID,
})

export const deletingNote = noteID => ({
  type: DELETING_NOTE,
  noteID,
})

export const fetchingFile = noteID => ({
  type: FETCHING_FILE,
  noteID,
})
