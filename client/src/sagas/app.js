import { put, takeEvery } from 'redux-saga/effects'

import { REQUEST_CHANGE_THEME } from '../store/actions/constants'
import { changeTheme } from '../store/actions/index'

function* handleChangeTheme() {
  const theme = localStorage.theme === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  yield put(changeTheme(theme))
}

export default function* rootSaga() {
  yield takeEvery(REQUEST_CHANGE_THEME, handleChangeTheme)
}
