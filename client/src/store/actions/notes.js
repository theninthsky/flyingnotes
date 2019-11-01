import { batch } from 'react-redux';
import axios from 'axios';

import * as actionTypes from './actionTypes';

export const fetchNotes = () => {
    return async dispatch => {
        let notes;
        if (localStorage.userId) {
            const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes');
            notes = data.notes;
        } else if (localStorage.notes) {
            notes = JSON.parse(localStorage.notes);
        }
        batch(() => {
            dispatch({ type: actionTypes.SET_NOTES, notes });
            dispatch({type: actionTypes.NOTES_FETCHED});
        });
    };
};

export const addNote = newNote => {
    return async dispatch => {
        if (localStorage.userId) {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes', {newNote});
            newNote = data;
        } else {
            newNote = { ...newNote, date: Date.now() }
            localStorage.setItem('notes', JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), newNote] : [newNote]));
        }
        dispatch({ type: actionTypes.ADD_NOTE, newNote });
    };
};

export const editNote = updatedNote => {
    return async dispatch => {
        if (localStorage.userId) {
            const { data } = await axios.put(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes', {updatedNote});
            updatedNote = data.updatedNote;
        } else {
            updatedNote.date = Date.now();
            localStorage.setItem('notes', 
                JSON.stringify(JSON.parse(localStorage.notes).map(note => note._id === updatedNote._id ? updatedNote : note
            )));
        }
        dispatch({ type: actionTypes.UPDATE_NOTE, updatedNote });
    };
};

export const deleteNote = noteId => {
    return async dispatch => {
        if (localStorage.userId) {
            const { status } = await axios.delete(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes', {data: {noteId}});
            if (status !== 200) {
                noteId = '';
            }
        } else {
            localStorage.setItem('notes', 
                JSON.stringify(JSON.parse(localStorage.notes).filter(note => note._id !== noteId)));
        }
        dispatch({ type: actionTypes.DELETE_NOTE, noteId });
    };
};