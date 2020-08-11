import { FETCH_FILES, SET_FILES, UPLOAD_FILE, ADD_FILE, DOWNLOAD_FILE, ADD_ATTACHMENT } from './constants'

export const fetchFiles = () => ({ type: FETCH_FILES })

export const setFiles = files => ({ type: SET_FILES, files })

export const uploadFile = file => ({ type: UPLOAD_FILE, file })

export const addFile = file => ({ type: ADD_FILE, file })

export const downloadFile = id => ({ type: DOWNLOAD_FILE, fileID: id })

export const addAttachment = ({ fileID, attachment }) => ({ type: ADD_ATTACHMENT, fileID, attachment })
