import { batch } from 'react-redux';
import axios from 'axios';

import * as actionTypes from './actionTypes';

const { REACT_APP_SERVER_URL } = process.env;

export const fetchFile = note => {
    return async dispatch => {
        dispatch({ type: actionTypes.FETCHING_FILE, noteId: note._id });
        const { data } = await axios.get(`${REACT_APP_SERVER_URL}/${note._id}/file`);
        note.file = data.file;
        batch(() => {
            dispatch({ type: actionTypes.POPULATE_FILE, note });
            dispatch({ type: actionTypes.FETCHING_FILE, noteId: '' });
        });
    };
};