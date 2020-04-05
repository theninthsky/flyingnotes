import { combineReducers } from 'redux'

import appReducer from './app'
import userReducer from './user'
import notesReducer from './notes'

export default combineReducers({
  app: appReducer,
  user: userReducer,
  notes: notesReducer,
})
