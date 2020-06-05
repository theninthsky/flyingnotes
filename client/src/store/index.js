import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/index'

import appSaga from '../sagas/app'
import userSaga from '../sagas/user'
import notesSaga from '../sagas/notes'
import filesSaga from '../sagas/files'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

export default createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(appSaga)
sagaMiddleware.run(userSaga)
sagaMiddleware.run(notesSaga)
sagaMiddleware.run(filesSaga)
