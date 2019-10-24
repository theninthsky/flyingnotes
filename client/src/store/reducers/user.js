import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: localStorage.userId,
    name: localStorage.name,
    loggedIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.LOGIN:
            return { userId: action.userId, name: action.name, loggedIn: true };
        case actionTypes.LOGOUT:
            return {};
        default: return state;
    }
};

export default reducer;