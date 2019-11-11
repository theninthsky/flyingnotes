import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: localStorage.userId,
    name: localStorage.name,
    theme: localStorage.theme || 'light',
    loading: false, // user related asynchronous actions
    fetchingNotes: false, // notes related asynchronous actions
    notesFetched: false,
    errorMessage: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.LOGIN:
            return { ...state, userId: action.userId, name: action.name, notesFetched: true };
        case actionTypes.LOADING:
            return { ...state, loading: action.loading };
        case actionTypes.FETCHING_NOTES:
            return { ...state, fetchingNotes: action.fetching };
        case actionTypes.NOTES_FETCHED:
            return { ...state, notesFetched: true, loading: false };
        case actionTypes.UPDATE:
            return { ...state, name: action.name, loading: false };
        case actionTypes.LOGOUT:
            return { theme: state.theme, notesFetched: true };
        case actionTypes.CHANGE_THEME:
            return { ...state, theme: action.theme };
        case actionTypes.ERROR:
            return { ...state, errorMessage: action.errorMessage };
        default: return state;
    }
};

export default reducer;