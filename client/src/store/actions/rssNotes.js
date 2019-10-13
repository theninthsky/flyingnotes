import { batch } from 'react-redux';
import axios from 'axios';

import * as actionTypes from './actionTypes';

export const setRssNotes = feeds => {
    console.log('setRssNotes');
    return async dispatch => {
        batch(() => {
            dispatch({ type: actionTypes.SET_RSS_NOTES, feeds });
            dispatch(updateRssNotes(feeds));
        });
    };
};

const fetchRss = async ({name, url}) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/fetch-rss/${url}`);
    return { type: actionTypes.UPDATE_RSS_NOTE, name: name, data: data };
};

export const updateRssNotes = feeds => {
    console.log('updateRssNotes', feeds);
    return async dispatch => {
        // eslint v6.2.0 bug
        // eslint-disable-next-line
        for (const feed of feeds) {
            dispatch(await fetchRss(feed));
        }
    }
};

export const addFeed = feed => {
    return async dispatch => {
        if (feed.userId) {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/feeds', feed);
            feed = response.data;
        } else {
            localStorage.setItem('feeds', JSON.stringify(localStorage.feeds ? [...JSON.parse(localStorage.feeds), feed] : [feed]));
        }
        dispatch({ type: actionTypes.ADD_FEED, feed });
    };
};