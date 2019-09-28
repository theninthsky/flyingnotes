import React, { memo } from 'react';

import Note from '../../components/Note/Note';
import NewNote from '../../components/Note/NewNote';
import NewRssFeed from '../../components/Note/NewRssFeed';
import styles from './Notes.module.scss';

const Notes = memo(props => {
    const notes = window.location.pathname === '/rss-notes' ?
        props.notes.map(note => 
            <Note 
                title={note.title}
                content={
                    note.content.map(item => 
                        <>
                            • <a href={item.link} title={item.content} rel="noopener noreferrer" target="_blank">{item.title}</a>
                            <br />
                            <br />
                        </>
                    )
                } 
                date={note.date} 
            />) :
        [...props.notes].reverse().map(
            note => <Note groupName={note.groupName} title={note.title} content={note.content} date={note.date} />
        );

    return (
        <div className={styles.notesContainer}>
            { window.location.pathname === '/rss-notes' ? <NewRssFeed /> : <NewNote path={window.location.pathname} /> }
            {notes}
        </div>
    );
});

export default Notes;

