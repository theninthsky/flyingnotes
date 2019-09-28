import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PERSONAL_NOTES:
            return [...action.notes];
        case actionTypes.SAVE_PERSONAL_NOTE:
            return [ ...state, action.note ];
        default: return state;
    }
};

export default reducer;