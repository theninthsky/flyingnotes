import axios from 'axios';

import * as actionTypes from './actionTypes';

export const setNotes = notes => ({ 
    type: actionTypes.SET_NOTES, 
    notes
});

export const addNote = note => {
    return async dispatch => {
        if (localStorage.userId) {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes', {newNote: note});
            note = data;
        } else {
            note = { ...note, date: Date.now() };
            localStorage.setItem('notes', JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), note] : [note]));
        }
        dispatch({ type: actionTypes.ADD_NOTE, note });
    };
};

export const editNote = note => {
    
};