import axios from 'axios'
import { batch } from 'react-redux'

import { LOADING, ERROR, SET_NAME, SET_NOTES, NOTES_FETCHED } from './actionTypes'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

axios.defaults.withCredentials = true

export const register = ({ credentials }) => {
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

      batch(() => {
        dispatch({ type: SET_NAME, name })
        dispatch({ type: SET_NOTES, notes })
        dispatch({ type: NOTES_FETCHED, status: true })
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

      batch(() => {
        dispatch({ type: SET_NAME, name })
        dispatch({ type: SET_NOTES, notes })
        dispatch({ type: NOTES_FETCHED, status: true })
      })
    } catch ({ response: { data } }) {
      dispatch({ type: ERROR, errorMessage: data })
    }
    dispatch({ type: LOADING, loading: false })
  }
}

export const update = name => {
  return async dispatch => {
    await axios.put(`${REACT_APP_SERVER_URL}/update`, { name })

    localStorage.setItem('name', name)

    dispatch({ type: SET_NAME, name })
  }
}

export const changePassword = passwords => {
  return async dispatch => {
    batch(() => {
      dispatch({ type: LOADING, loading: true })
      dispatch({ type: ERROR, errorMessage: false })
    })
    try {
      await axios.put(`${REACT_APP_SERVER_URL}/register`, passwords)
    } catch ({ response: { data } }) {
      dispatch({ type: ERROR, errorMessage: data })
    }
    dispatch({ type: LOADING, loading: false })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: LOADING, loading: true })
    try {
      await axios.post(`${REACT_APP_SERVER_URL}/logout`)

      localStorage.removeItem('name')

      batch(() => {
        dispatch({ type: SET_NAME, name: null })
        dispatch({ type: SET_NOTES, notes: JSON.parse(localStorage.notes || '[]') })
      })
    } catch ({ response: { data } }) {
      dispatch({ type: ERROR, errorMessage: data })
    }

    batch(() => {
      dispatch({ type: LOADING, loading: false })
      dispatch({ type: NOTES_FETCHED, status: false })
    })
  }
}
