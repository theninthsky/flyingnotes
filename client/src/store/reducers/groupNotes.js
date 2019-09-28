import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_GROUP_NOTES:
            return [...action.notes];
        case actionTypes.SAVE_GROUP_NOTE:
            return [ ...state, action.note ];
        default: return state;
    }
};

export default reducer;