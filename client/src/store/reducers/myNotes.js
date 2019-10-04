import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_MY_NOTES:
            return [...action.notes];
        case actionTypes.ADD_NEW_NOTE:
            return [ ...state, action.note ];
        default: return state;
    }
};

export default reducer;