import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: localStorage.userId,
    name: localStorage.name,
    loading: false,
    notesFetched: false,
    theme: localStorage.theme || 'light',
    errorMessage: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.LOGIN:
            return { userId: action.userId, name: action.name, notesFetched: true, theme: state.theme, loading: false, error: false };
        case actionTypes.NOTES_FETCHED:
            return { ...state, notesFetched: true, loading: false };
        case actionTypes.UPDATE:
            return { ...state, name: action.name, loading: false };
        case actionTypes.LOGOUT:
            return { theme: state.theme, notesFetched: true };
        case actionTypes.CHANGE_THEME:
            return { ...state, theme: action.theme };
        case actionTypes.LOADING:
            return { ...state, loading: action.loading };
        case actionTypes.ERROR:
            return { ...state, errorMessage: action.errorMessage };
        default: return state;
    }
};

export default reducer;