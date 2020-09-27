import axios from 'axios'
import { batch } from 'react-redux'
import { createWebSocketConnection, ws } from '../../socketConnection'

import { LOADING, ERROR, SET_NAME, SET_NOTES } from './actionTypes'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

export const register = credentials => {
  return async dispatch => {
    batch(() => {
      dispatch({ type: LOADING, loading: true })
      dispatch({ type: ERROR, errorMessage: false })
    })

    try {
      const {
        data: { name, notes },
      } = await axios.post(`${REACT_APP_SERVER_URL}/register`, {
        ...credentials,
        notes: localStorage.notes
          ? JSON.parse(localStorage.notes).map(note => ({ ...note, _id: null })) // _id is removed to prevent ObjectId errors on server side
          : [],
      })

      localStorage.clear()
      localStorage.setItem('name', name)

      createWebSocketConnection()

      batch(() => {
        dispatch({ type: SET_NAME, name })
        dispatch({ type: SET_NOTES, notes })
      })
    } catch ({ response: { data } }) {
      dispatch({ type: ERROR, errorMessage: data })
    }
    dispatch({ type: LOADING, loading: false })
  }
}

export const login = credentials => {
  return async dispatch => {
    batch(() => {
      dispatch({ type: LOADING, loading: true })
      dispatch({ type: ERROR, errorMessage: false })
    })

    try {
      const {
        data: { name, notes },
      } = await axios.post(`${REACT_APP_SERVER_URL}/login`, credentials)

      localStorage.setItem('name', name)

      createWebSocketConnection()

      batch(() => {
        dispatch({ type: SET_NAME, name })
        dispatch({ type: SET_NOTES, notes })
      })
    } catch ({ response: { data } }) {
      dispatch({ type: ERROR, errorMessage: data })
    }
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
      await axios.post(`${REACT_APP_SERVER_URL}/logout`)

      localStorage.removeItem('name')
      ws.close()

      batch(() => {
        dispatch({ type: SET_NAME, name: null })
        dispatch({ type: SET_NOTES, notes: JSON.parse(localStorage.notes || '[]') })
      })
    } catch ({ response: { data } }) {
      dispatch({ type: ERROR, errorMessage: data })
    }

    dispatch({ type: LOADING, loading: false })
  }
}
