import { put, takeEvery } from 'redux-saga/effects'

import { REQUEST_CHANGE_THEME } from '../store/actions/constants'
import * as actions from '../store/actions/index'

function* changeTheme() {
  const theme = localStorage.theme === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  yield put(actions.changeTheme(theme))
}

export default function* rootSaga() {
  yield takeEvery(REQUEST_CHANGE_THEME, changeTheme)
}
