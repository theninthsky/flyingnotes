import { all, fork } from 'redux-saga/effects'

import appSaga from './app'
import userSaga from './user'
import notesSaga from './notes'
import filesSaga from './files'

export default function* rootSaga() {
  yield all[(fork(appSaga), fork(userSaga), fork(notesSaga), fork(filesSaga))]
}
