import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import Note from '../../components/Note/Note';
import NewNote from '../../components/Note/NewNote';
import * as actions from '../../store/actions/index';
import styles from './Notes.module.scss';

const Notes = props => {
    const { loggedIn, notes, fetchNotes, setNotes } = props;

    useEffect(() => {
        console.log('[Notes] rendered!');
        if (!notes.length) {
            if (localStorage.userId) {
                if (!loggedIn) {
                    fetchNotes();
                }
            } else {
                if (localStorage.notes) {
                    setNotes(JSON.parse(localStorage.notes));
                }
            }
        }
    }, [ loggedIn, notes, fetchNotes, setNotes ]);

    const filteredNotes = useMemo(() => [...notes].reverse().map((note, ind) => 
        <Note key={note['_id'] || ind} title={note.title} content={note.content} date={note.date} />
    ), [notes]);

    return (
        <div className={styles.notesContainer}>
            <NewNote />
            { filteredNotes }
        </div>
    );
};

const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn,
    notes: state.notes
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(actions.fetchNotes()),
    setNotes: notes => dispatch(actions.setNotes(notes)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

