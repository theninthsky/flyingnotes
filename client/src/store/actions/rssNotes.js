import axios from 'axios';

import * as actionTypes from './actionTypes';

const rssFeeds = [{ name: 'Reddit',url: 'http://www.reddit.com/.rss' }, { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' }, { name: 'Ynet', url: 'http://www.ynet.co.il/Integration/StoryRss2.xml'}];

export const setRssNotes = ()=> ({ type: actionTypes.SET_RSS_NOTES, feeds: rssFeeds });

const fetchRss = async ({name, url}) => {
    const feed = await axios.get('http"//localhost:3000');
    return { type: actionTypes.UPDATE_RSS_NOTE, name: name, feed: feed };
};

export const updateRssNotes = () => {
    return async dispatch => {
        // eslint v6.2.0 bug
        // eslint-disable-next-line
        for (const feed of rssFeeds) {
            dispatch(await fetchRss(feed));
        }
    }
};

export const addNewFeed = feed => {
    // POST TO DB
    return { type: actionTypes.ADD_NEW_FEED, feed: feed };
};