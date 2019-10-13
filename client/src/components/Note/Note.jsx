import React, { useEffect } from 'react';

import styles from './Note.module.scss';

const Note = props => {
    useEffect(() => console.log('[Note] rendered!'));
    
    return (
        <div className={styles.note}>
            { props.title || props.name ? <h1 className={styles.title} dir="auto">{props.title || props.name}</h1> : null }
            <div className={styles.content} dir="auto">{props.content}</div>
            <div className={styles.date}>{new Date(props.date).toLocaleString()}</div>
        </div>
    );
};

export default Note;