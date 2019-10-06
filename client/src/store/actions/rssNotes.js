import RSSParser from 'rss-parser';

import * as actionTypes from './actionTypes';

const rssFeeds = [{ name: 'Reddit',url: 'http://www.reddit.com/.rss' }, { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' }, { name: 'Ynet', url: 'http://www.ynet.co.il/Integration/StoryRss2.xml'}];

export const setRssNotes = ()=> ({ type: actionTypes.SET_RSS_NOTES, feeds: rssFeeds });

const fetchRss = async ({name, url}) => {
    const parser = new RSSParser();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const feed = await parser.parseURL(CORS_PROXY + url);
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