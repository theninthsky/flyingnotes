import * as actionTypes from '../actions/actionTypes';

const initialState = {
    name: localStorage.name,
    theme: localStorage.theme || 'light',
    loading: false,
    notesFetched: false,
    localNotesSet: false,
    fetchingFile: '', // recieves note id
    addingNote: false,
    updatingNote: '', // recieves note id
    deletingNote: '', // recieves note id
    errorMessage: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.LOGIN:
            return { ...state, name: action.name, notesFetched: true };
        case actionTypes.LOADING:
            return { ...state, loading: action.loading };
        case actionTypes.NOTES_FETCHED:
            return { ...state, notesFetched: true, loading: false };
        case actionTypes.LOCAL_NOTES_SET:
            return { ...state, localNotesSet: true };
        case actionTypes.FETCHING_FILE:
            return { ...state, fetchingFile: action.noteId };
        case actionTypes.ADDING_NOTE:
            return { ...state, addingNote: action.status };
        case actionTypes.UPDATING_NOTE:
            return { ...state, updatingNote: action.noteId };
        case actionTypes.DELETING_NOTE:
            return { ...state, deletingNote: action.noteId };
        case actionTypes.UPDATE_USER:
            return { ...state, name: action.name, loading: false };
        case actionTypes.LOGOUT:
            return { theme: state.theme, notesFetched: false };
        case actionTypes.CHANGE_THEME:
            return { ...state, theme: action.theme };
        case actionTypes.ERROR:
            return { ...state, errorMessage: action.errorMessage };
        default: return state;
    }
};

export default reducer;