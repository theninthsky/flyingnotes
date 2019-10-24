import { batch } from 'react-redux';
import axios from 'axios';

import * as actionTypes from './actionTypes';
import { setNotes } from './index';

export const register = credentials => {
    return async dispatch => {
        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/register', credentials);
        if (data.userId) {
            localStorage.clear();
            dispatch({ type: actionTypes.REGISTER, userId: data.userId, name: data.name });
        } else {
            //show response to user...
        }
    };
};

export const login = credentials => {
    return async dispatch => {
        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/login', credentials);
        if (data.userId) {
            const { userId, name, notes } = data;
            localStorage.setItem('userId', userId);
            localStorage.setItem('name', name);
            batch(() => {
                dispatch({ type: actionTypes.LOGIN, userId, name });
                dispatch({ type: actionTypes.SET_NOTES, notes });
            });
        } else {
            // show response to user...
        }
    }
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        batch(() => {
            dispatch({type: actionTypes.LOGOUT});
            dispatch(setNotes(JSON.parse(localStorage.notes || '[]')));
        });
    };
};

export const fetchNotes = () => {
    return async dispatch => {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/users/' + localStorage.userId);
        dispatch({ type: actionTypes.SET_NOTES, notes: data });
    };
};