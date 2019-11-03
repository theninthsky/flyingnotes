import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Bar from './Bar/Bar';
import NewNote from './NewNote';
import styles from './Note.module.scss';

const Note = props => {
    const [showBar, setShowBar] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    useEffect(() => console.log('[Note] rendered!'));

    const toggleBarHandler = mode => setShowBar(mode);
    
    const toggleEditModeHandler = () => setEditMode(!editMode);

    const note = editMode ? 
     <NewNote {...props} id={props.id} date={props.date} toggleEditMode={toggleEditModeHandler} toggleBar={() => toggleBarHandler(false)} update /> :
     <div className={styles.note} onMouseEnter={() => toggleBarHandler(true)} onMouseLeave={() => toggleBarHandler(false)}>
        { showBar ? <Bar id={props.id} edit={toggleEditModeHandler} delete={props.deleteNote} /> : null }
        { props.category ? <div className={styles.category} dir="auto" style={{backgroundColor: props.color}} >{props.category}</div> : null }
        { props.title ? <h1 className={styles.title} dir="auto">{props.title}</h1> : null }
        <div className={styles.content} dir="auto">{props.content}</div>
        <div className={styles.date}>{new Date(props.date).toLocaleString()}</div>
    </div>;

    
    return note;
};

const mapDispatchToProps = dispatch => ({
    deleteNote: noteId => dispatch(actions.deleteNote(noteId))
});

export default connect(null, mapDispatchToProps)(Note);