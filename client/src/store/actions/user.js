import { batch } from 'react-redux';
import axios from 'axios';

import * as actionTypes from './actionTypes';

const { REACT_APP_SERVER_URL } = process.env;

axios.defaults.withCredentials = true;

export const register = credentials => {
    return async dispatch => {
        dispatch({ type: actionTypes.LOADING, loading: true });
        try {
            const { data: { name, notes } } = await axios.post(`${REACT_APP_SERVER_URL}/register`, {
                ...credentials,
                notes: localStorage.notes ?
                    JSON.parse(localStorage.notes).map(note => ({ ...note, _id: null })) : // _id is removed to prevent ObjectId errors on server side
                    []
            });
            localStorage.clear();
            localStorage.setItem('name', name);
            batch(() => {
                dispatch({ type: actionTypes.REGISTER, name });
                dispatch({ type: actionTypes.SET_NOTES, notes });
            });
        }
        catch ({ response: { data } }) {
            dispatch({ type: actionTypes.ERROR, errorMessage: data });
        }
        dispatch({ type: actionTypes.LOADING, loading: false });
    };
};

export const login = credentials => {
    return async dispatch => {
        dispatch({ type: actionTypes.LOADING, loading: true });
        try {
            const { data: { name, notes } } = await axios.post(`${REACT_APP_SERVER_URL}/login`, credentials);
            localStorage.setItem('name', name);
            batch(() => {
                dispatch({ type: actionTypes.LOGIN, name });
                dispatch({ type: actionTypes.SET_NOTES, notes });
            });
        }
        catch ({ response: { data } }) {
            dispatch({ type: actionTypes.ERROR, errorMessage: data });
        }
        dispatch({ type: actionTypes.LOADING, loading: false });
    };
};

export const update = credentials => {
    return async dispatch => {
        dispatch({ type: actionTypes.LOADING, loading: true });
        try {
            const { data: { name } } = await axios.put(`${REACT_APP_SERVER_URL}/register`, credentials);
            localStorage.setItem('name', name);
            dispatch({ type: actionTypes.UPDATE, name });
        }
        catch ({ response: { data } }) {
            dispatch({ type: actionTypes.ERROR, errorMessage: data });
        }
        dispatch({ type: actionTypes.LOADING, loading: false });
    };
};

export const logout = () => {
    axios.post(`${REACT_APP_SERVER_URL}/logout`);
    return dispatch => {
        localStorage.removeItem('name');
        batch(() => {
            dispatch({ type: actionTypes.SET_NOTES, notes: JSON.parse(localStorage.notes || '[]') });
            dispatch({ type: actionTypes.LOGOUT });
        });
    };
};

export const changeTheme = theme => {
    localStorage.setItem('theme', theme);
    return { type: actionTypes.CHANGE_THEME, theme };
};

export const clearError = () => ({ type: actionTypes.ERROR, errorMessage: false });