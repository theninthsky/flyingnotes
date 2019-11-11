import { batch } from 'react-redux';
import axios from 'axios';

import * as actionTypes from './actionTypes';

export const fetchNotes = () => {
    return async dispatch => {
        dispatch({ type: actionTypes.FETCHING_NOTES, fetching: true });
        let notes;
        if (localStorage.userId) {
            const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes');
            notes = data.notes;
        } else if (localStorage.notes) {
            notes = JSON.parse(localStorage.notes);
        }
        batch(() => {
            dispatch({ type: actionTypes.SET_NOTES, notes });
            dispatch({ type: actionTypes.FETCHING_NOTES, fetching: false });
            dispatch({type: actionTypes.NOTES_FETCHED});
        });
    };
};

export const addNote = newNote => {
    return async dispatch => {
        dispatch({ type: actionTypes.FETCHING_NOTES, fetching: true });
        if (localStorage.userId) {
            const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes', {newNote});
            newNote = data;
        } else {
            newNote = { ...newNote, _id: Date.now(), date: Date.now() }
            localStorage.setItem('notes', JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), newNote] : [newNote]));
        }
        batch(() => {
            dispatch({ type: actionTypes.ADD_NOTE, newNote });
            dispatch({ type: actionTypes.FETCHING_NOTES, fetching: false });
        });
    };
};

export const updateNote = updatedNote => {
    return async dispatch => {
        dispatch({ type: actionTypes.FETCHING_NOTES, fetching: true });
        if (localStorage.userId) {
            const { data } = await axios.put(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes', {updatedNote});
            updatedNote = data.updatedNote;
        } else {
            updatedNote.date = Date.now();
            localStorage.setItem('notes', 
                JSON.stringify(JSON.parse(localStorage.notes).map(note => note._id === updatedNote._id ? updatedNote : note
            )));
        }
        batch(() => {
            dispatch({ type: actionTypes.UPDATE_NOTE, updatedNote });
            dispatch({ type: actionTypes.FETCHING_NOTES, fetching: false });
        });
    };
};

export const deleteNote = noteId => {
    return async dispatch => {
        dispatch({ type: actionTypes.FETCHING_NOTES, fetching: true });
        if (localStorage.userId) {
            const { status } = await axios.delete(process.env.REACT_APP_SERVER_URL + '/' + localStorage.userId + '/notes', {data: {noteId}});
            if (status !== 200) {
                noteId = '';
            }
        } else {
            localStorage.setItem('notes', 
                JSON.stringify(JSON.parse(localStorage.notes).filter(note => note._id !== noteId)));
        }
        batch(() => {
            dispatch({ type: actionTypes.DELETE_NOTE, noteId });
            dispatch({ type: actionTypes.FETCHING_NOTES, fetching: false });
        });
    };
};