import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import styles from './NewRssFeed.module.scss';

const NewRssFeed = props => {
    const [name, setName] = useState('');
    const [feedUrl, setFeedUrl] = useState('');

    const nameHandler = event => setName(event.target.value);

    const urlHandler = event => setFeedUrl(event.target.value);
    
    const addFeedHandler = event => {
        event.preventDefault();
        props.onAddRssFeed({ name, feedUrl });
        setName('');
        setFeedUrl('');
    }
    
    return (
        <div className={styles.note}>
            <form onSubmit={addFeedHandler} action="/" method="post" autoComplete="off">
                <input className={styles.name} dir="auto" placeholder="Name" maxLength="40" value={name} onChange={nameHandler} required />
                <input className={styles.url} placeholder="https://www.example.com" value={feedUrl} onChange={urlHandler} required></input>
                <input className={styles.save} type="submit" value="Add Feed" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onAddRssFeed: feed => dispatch(actions.addNewFeed(feed))
});

export default connect(null, mapDispatchToProps)(NewRssFeed);