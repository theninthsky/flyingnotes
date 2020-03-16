import { batch } from 'react-redux'
import axios from 'axios'

import * as actionTypes from './actionTypes'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

export const fetchFile = note => {
  const { _id, fileName } = note

  return async dispatch => {
    dispatch({ type: actionTypes.FETCHING_FILE, noteId: _id })

    const { data } = await axios.get(`${REACT_APP_SERVER_URL}/${_id}/file`, {
      responseType: 'blob',
    })

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    note.file = new Blob([data])

    batch(() => {
      dispatch({ type: actionTypes.POPULATE_FILE, note })
      dispatch({ type: actionTypes.FETCHING_FILE, noteId: '' })
    })
  }
}
