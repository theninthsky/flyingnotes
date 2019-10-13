import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_RSS_NOTES:
            return action.feeds;
        case actionTypes.UPDATE_RSS_NOTE:
            const content = action.data.items ? action.data.items.map(item => ({ title: item.title, link: item.link, content: item.content })) : action.data;
            return state.map(feed => feed.name === action.name ? 
                { ...feed, content: content, date: Date.now() } : 
                feed);
        case actionTypes.ADD_FEED:
            return [ ...state, action.feed ];
        default: return state;
    }
};

export default reducer;