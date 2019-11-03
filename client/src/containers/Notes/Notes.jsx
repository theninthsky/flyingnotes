import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import Note from '../../components/Note/Note';
import NewNote from '../../components/Note/NewNote';
import * as actions from '../../store/actions/index';
import styles from './Notes.module.scss';

const Notes = props => {
    const { user: { userId, notesFetched }, notes, fetchNotes } = props;

    useEffect(() => {
        console.log('[Notes] rendered!');
        if (!notesFetched) {
            fetchNotes();
        }
    }, [ userId, notesFetched, notes, fetchNotes ]);

    const filteredNotes = useMemo(() => [...notes].sort((a, b) => b.date - a.date).map(note => 
        <Note 
            key={note._id} 
            id={note._id} 
            color={note.color} 
            category={note.category} 
            title={note.title} 
            content={note.content} 
            date={note.date} 
        />
    ), [notes]);

    return (
        <div className={styles.notesContainer}>
            <NewNote />
            { filteredNotes }
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user,
    notes: state.notes
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(actions.fetchNotes())
  });

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

