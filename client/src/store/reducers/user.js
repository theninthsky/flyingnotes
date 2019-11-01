import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: localStorage.userId,
    name: localStorage.name,
    notesFetched: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.LOGIN:
            return { userId: action.userId, name: action.name, notesFetched: true };
        case actionTypes.NOTES_FETCHED:
            return { ...state, notesFetched: true };
        case actionTypes.LOGOUT:
            return { notesFetched: true };
        default: return state;
    }
};

export default reducer;