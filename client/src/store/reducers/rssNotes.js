import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_RSS_NOTES:
            const content = action.feed.items.map(item => ({ title: item.title, link: item.link, content: item.content }));
            return [ ...state, { title: action.title, content: content, lang: action.feed.language, date: new Date().toTimeString().split` `[0] } ];
        case actionTypes.SAVE_RSS_NOTE:
            return 'post to DB';
        default: return state;
    }
};

export default reducer;