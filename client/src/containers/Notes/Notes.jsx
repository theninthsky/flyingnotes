import React, { memo } from 'react';

import Note from '../../components/Note/Note';
import NewNote from '../../components/Note/NewNote';
import NewRssFeed from '../../components/Note/NewRssFeed';
import styles from './Notes.module.scss';

const Notes = memo(props => {
    const notes = [...props.notes].reverse().map(
        note => <Note groupName={note.groupName} title={note.title} content={note.content} url={note.url} date={note.date} />
    );

    return (
        <div className={styles.notesContainer}>
            { window.location.pathname === '/rss-notes' ? <NewRssFeed /> : <NewNote path={window.location.pathname} /> }
            {notes}
        </div>
    );
});

export default Notes;

