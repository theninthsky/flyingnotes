import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import styles from './NewRssFeed.module.scss';

const NewRssFeed = props => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const nameHandler = event => setName(event.target.value);

    const urlHandler = event => setUrl(event.target.value);
    
    const addFeedHandler = event => {
        event.preventDefault();
        props.onAddRssFeed({ userId: localStorage.userId, name, url });
        setName('');
        setUrl('');
    }
    
    return (
        <div className={styles.note}>
            <form onSubmit={addFeedHandler} autoComplete="off">
                <input className={styles.name} dir="auto" placeholder="Name" maxLength="40" value={name} onChange={nameHandler} required />
                <input className={styles.url} placeholder="https://www.example.com" value={url} onChange={urlHandler} required></input>
                <input className={styles.save} type="submit" value="Add Feed" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onAddRssFeed: feed => dispatch(actions.addFeed(feed))
});

export default connect(null, mapDispatchToProps)(NewRssFeed);