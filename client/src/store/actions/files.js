import * as actionTypes from './actionTypes'

export const fetchFile = note => ({ type: actionTypes.FETCH_FILE, note })

export const populateFile = note => ({ type: actionTypes.POPULATE_FILE, note })
