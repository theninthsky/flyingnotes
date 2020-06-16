import { FETCH_FILE, POPULATE_FILE } from './constants'

export const fetchFile = note => ({ type: FETCH_FILE, note })

export const populateFile = note => ({ type: POPULATE_FILE, note })
