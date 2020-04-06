import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../store/actions/actionTypes'
import * as actions from '../store/actions/index'

function* changeTheme() {
  const theme = localStorage.theme === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  yield put(actions.changeTheme(theme))
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.REQUEST_CHANGE_THEME, changeTheme)
}
