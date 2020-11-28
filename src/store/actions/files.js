import { batch } from 'react-redux'
import { ws } from '../../websocketConnection'

import {
  SET_FILES,
  UPLOADING_FILE,
  ADD_FILE,
  DOWNLOADING_FILE,
  ADD_ATTACHMENT,
  DELETING_FILE,
  REMOVE_FILE,
} from './actionTypes'
import { toBase64, fromBase64 } from '../../util/base64'

export const getFiles = () => ws.json({ type: 'getFiles' })

export const setFiles = ({ files }) => {
  return dispatch => {
    files.sort((a, b) => new Date(b.date) - new Date(a.date))

    dispatch({ type: SET_FILES, files })
  }
}

export const uploadFile = ({ category, name, extension, selectedFile }) => {
  return async dispatch => {
    dispatch({ type: UPLOADING_FILE, bool: true })

    const base64 = await toBase64(selectedFile)

    ws.json({ type: 'uploadFile', file: { category, name, extension, base64 } })
  }
}

export const addFile = ({ file }) => {
  return dispatch => {
    batch(() => {
      dispatch({ type: ADD_FILE, file })
      dispatch({ type: UPLOADING_FILE, bool: false })
    })
  }
}

export const downloadFile = fileID => {
  return dispatch => {
    dispatch({ type: DOWNLOADING_FILE, fileID })

    ws.json({ type: 'downloadFile', fileID })
  }
}

export const addAttachment = ({ fileID, name, base64 }) => {
  return async dispatch => {
    const attachment = await fromBase64(name, base64)

    batch(() => {
      dispatch({ type: DOWNLOADING_FILE, fileID: null })
      dispatch({ type: ADD_ATTACHMENT, fileID, attachment })
    })
  }
}

export const deleteFile = fileID => {
  return dispatch => {
    dispatch({ type: DELETING_FILE, fileID })

    ws.json({ type: 'deleteFile', fileID })
  }
}

export const removeFile = ({ fileID }) => {
  return dispatch => {
    batch(() => {
      dispatch({ type: DELETING_FILE, fileID: null })
      dispatch({ type: REMOVE_FILE, fileID })
    })
  }
}
