import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_RSS_NOTES:
            const rssArr = [];
            for (let feed of action.feeds) {
                rssArr.push({ name: feed.name, content: [] });
            }
            return rssArr;
        case actionTypes.UPDATE_RSS_NOTE:
            const content = action.feed.items.map(item => ({ title: item.title, link: item.link, content: item.content }));
            return state.map(feed => feed.name === action.name ? 
                { ...feed, content: content, date: new Date().toTimeString().split` `[0] } : 
                feed);
        case actionTypes.SAVE_RSS_NOTE:
            return 'post to DB';
        default: return state;
    }
};

export default reducer;