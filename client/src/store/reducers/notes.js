import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NOTES:
            return action.notes;
        case actionTypes.ADD_NOTE:
            return [ ...state, action.note ];
        default: return state;
    }
};

export default reducer;