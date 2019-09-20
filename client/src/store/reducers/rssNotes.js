const initialState = [{ title: 'Reddit',url: 'http://www.reddit.com/.rss' }, { title: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' }];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_RSS_FEED':
            return [ ...state, action.rssFeed ];
        default: return [...state];
    }
};

export default reducer;