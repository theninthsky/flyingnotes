import { batch } from 'react-redux'
import { createWebSocketConnection, ws } from '../../websocketConnection'

import { LOADING, ERROR, SET_NAME, SET_NOTES } from './actionTypes'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

export const register = credentials => {
  return async dispatch => {
    batch(() => {
      dispatch({ type: LOADING, loading: true })
      dispatch({ type: ERROR, errorMessage: false })
    })

    const body = JSON.stringify({
      ...credentials,
      notes: localStorage.notes
        ? JSON.parse(localStorage.notes).map(note => ({ ...note, _id: null })) // _id is removed to prevent ObjectId errors on server side
        : [],
    })
    const res = await fetch(`${REACT_APP_SERVER_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    const { name, notes, err } = await res.json()

    if (err) {
      return batch(() => {
        dispatch({ type: ERROR, errorMessage: err })
        dispatch({ type: LOADING, loading: false })
      })
    }

    localStorage.clear()
    localStorage.setItem('name', name)

    createWebSocketConnection()

    batch(() => {
      dispatch({ type: SET_NAME, name })
      dispatch({ type: SET_NOTES, notes })
    })

    dispatch({ type: LOADING, loading: false })
  }
}

export const login = credentials => {
  return async dispatch => {
    batch(() => {
      dispatch({ type: LOADING, loading: true })
      dispatch({ type: ERROR, errorMessage: false })
    })

    const body = JSON.stringify({ ...credentials })
    const res = await fetch(`${REACT_APP_SERVER_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    const { name, notes, err } = await res.json()

    if (err) {
      return batch(() => {
        dispatch({ type: ERROR, errorMessage: err })
        dispatch({ type: LOADING, loading: false })
      })
    }

    localStorage.setItem('name', name)

    createWebSocketConnection()

    batch(() => {
      dispatch({ type: SET_NAME, name })
      dispatch({ type: SET_NOTES, notes })
    })

    dispatch({ type: LOADING, loading: false })
  }
}

export const updateUser = name => ws.json({ type: 'updateUser', newName: name })

export const modifyUser = ({ status, newName }) => {
  return dispatch => {
    if (status === 'FAIL') return

    localStorage.setItem('name', newName)

    dispatch({ type: SET_NAME, name: newName })
  }
}

export const changePassword = (password, newPassword) => {
  return async dispatch => {
    batch(() => {
      dispatch({ type: LOADING, loading: true })
      dispatch({ type: ERROR, errorMessage: false })
    })

    ws.json({ type: 'changePassword', password, newPassword })
  }
}

export const passwordChanged = ({ status }) => {
  return dispatch => {
    if (status === 'SUCCESS') dispatch({ type: LOADING, loading: false })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: LOADING, loading: true })
    try {
      await fetch(`${REACT_APP_SERVER_URL}/logout`, { method: 'POST' })

      localStorage.removeItem('name')
      ws.close()

      batch(() => {
        dispatch({ type: SET_NAME, name: null })
        dispatch({ type: SET_NOTES, notes: JSON.parse(localStorage.notes || '[]') })
      })
    } catch (err) {
      dispatch({ type: ERROR, errorMessage: 'Failed to logout' })
    }

    dispatch({ type: LOADING, loading: false })
  }
}
