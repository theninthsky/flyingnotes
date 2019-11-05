import React, { useState, useEffect } from 'react';

import Bar from './Bar/Bar';
import NewNote from './NewNote';
import styles from './Note.module.scss';

const Note = props => {
    const [showBar, setShowBar] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);
    
    useEffect(() => console.log('[Note] rendered!'));

    const toggleBarHandler = mode => {
        setShowBar(mode);
        setShowConfirmMessage(false);
    };
    
    const toggleEditModeHandler = () => setEditMode(!editMode);
    
    const note = editMode ? 
     <NewNote 
        {...props} 
        theme={props.theme} 
        id={props.id} 
        date={props.date} 
        toggleEditMode={toggleEditModeHandler} 
        closeBar={() => toggleBarHandler(false)} 
        update
    /> :
     <div className={styles.note} style={props.theme} onMouseEnter={() => toggleBarHandler(true)} onMouseLeave={() => toggleBarHandler(false)}>
        { props.category ? <div className={styles.category} dir="auto" style={{backgroundColor: props.color}} >{props.category}</div> : null }
        { props.title ? <h1 className={styles.title} dir="auto">{props.title}</h1> : null }
        <div className={styles.content} dir="auto">{props.content}</div>
        { showBar ? <Bar id={props.id} edit={toggleEditModeHandler} showConfirmMessage={setShowConfirmMessage} /> : null }
        { showConfirmMessage ? <div className={styles.confirmMessage}>Delete this note?</div> : <div className={styles.date}>{new Date(props.date).toLocaleString()}</div> }
    </div>;

    return note;
};

export default Note;