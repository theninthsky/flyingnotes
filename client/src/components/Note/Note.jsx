import React from 'react';
import RSSParser from 'rss-parser';

import styles from './Note.module.scss';

const fetchRss = async url => {
    const parser = new RSSParser();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const feed = await parser.parseURL(CORS_PROXY + url);
    console.log(feed.title);

    // feed.items.forEach(item => {
    //     console.log(item.title + ':' + item.link)
    // });

};

const Note = props => {
    fetchRss(props.url);
    const content = /*props.url ? fetchRss(props.url) : */props.content;
    
    return (
        <div className={styles.note}>
            { props.groupName ? <div className={styles.groupName}>{props.groupName}</div> : null }
            { props.title ? <h1 className={styles.title}>{props.title}</h1> : null }
            <div className={styles.content}>{content}</div>
            { !props.url ? <div className={styles.date}>{props.date}</div> : null }
        </div>
    );
};

export default Note;