import axios from 'axios';

import * as actionTypes from './actionTypes';

export const setUserNotes = notes => ({ 
    type: actionTypes.SET_USER_NOTES, 
    notes: notes
});

export const addNote = note => {
    return async dispatch => {
        if (note.userId) {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/notes', note);
            note = response.data;
        } else {
            note = { ...note, date: Date.now() };
            localStorage.setItem('notes', JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), note] : [note]));
        }
        dispatch({ type: actionTypes.ADD_NOTE, note });
    };
};