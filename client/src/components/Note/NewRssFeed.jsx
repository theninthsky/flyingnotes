import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './NewRssFeed.module.scss';

const NewRssFeed = props => {
    const [title, setTitle] = useState();
    const [rssFeedUrl, setRssFeedAddress] = useState();

    const titleHandler = event => setTitle(event.target.value);

    const urlHandler = event => setRssFeedAddress(event.target.value);
    
    const addFeedHandler = event => {
        event.preventDefault();
        props.onAddRssFeed({ title, rssFeedUrl });
    }
    
    return (
        <div className={styles.note}>
            <form onSubmit={addFeedHandler} action="/" method="post" autoComplete="off">
                <input className={styles.title} placeholder="Title" maxLength="40" value={title} onChange={titleHandler} required />
                <input className={styles.url} placeholder="https://www.example.com" value={rssFeedUrl} onChange={urlHandler} required></input>
                <input className={styles.save} type="submit" value="Add Feed" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onAddRssFeed: rssFeed => dispatch({ type: 'SAVE_RSS_FEED', rssFeed: rssFeed })
});

export default connect(null, mapDispatchToProps)(NewRssFeed);