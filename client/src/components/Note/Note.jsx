import React from 'react';

import styles from './Note.module.scss';

const Note = props => {
    return (
        <div className={styles.note}>
            { props.groupName ? <div className={styles.groupName}>{props.groupName}</div> : null }
            { props.title ? <h1 className={styles.title} dir="auto">{props.title}</h1> : null }
            <div className={styles.content} dir="auto">{props.content}</div>
            <div className={styles.date}>{props.date}</div>
        </div>
    );
};

export default Note;