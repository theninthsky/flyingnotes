import { combineReducers } from 'redux'

import appReducer from './app'
import userReducer from './user'
import notesReducer from './notes'
import filesReducer from './files'

export default combineReducers({
  app: appReducer,
  user: userReducer,
  notes: notesReducer,
  files: filesReducer,
})
