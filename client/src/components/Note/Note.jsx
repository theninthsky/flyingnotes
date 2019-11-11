import React, { useState, useEffect } from 'react';

import Options from './Options';
import NewNote from './NewNote';
import styles from './Note.module.scss';

const Note = props => {
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);
    
    useEffect(() => console.log('[Note] rendered!'));

    const toggleOptionsHandler = mode => setShowOptions(mode);

    const toggleConfirmMessageHanlder = mode => setShowConfirmMessage(mode);
    
    const toggleEditModeHandler = () => setEditMode(!editMode);
    
    const note = editMode ? 
     <NewNote 
        {...props} 
        theme={props.theme} 
        id={props.id} 
        date={props.date} 
        toggleEditMode={toggleEditModeHandler} 
        closeOptions={() => toggleOptionsHandler(false)} 
        update
    /> :
     <div className={styles.note} style={props.theme} onMouseMove={() => toggleOptionsHandler(true)} onMouseLeave={() => { toggleOptionsHandler(false); toggleConfirmMessageHanlder(false);}}>
        <div className={styles.category} dir="auto" style={{backgroundColor: props.color}} >{props.category}</div>
        { props.title ? <h1 className={styles.title} dir="auto">{props.title}</h1> : null }
        <div className={styles.content} dir="auto">{props.content}</div>
        { showOptions ? <Options id={props.id} edit={toggleEditModeHandler} toggleConfirmMessage={toggleConfirmMessageHanlder} /> : null }
        { showConfirmMessage ? <div className={styles.confirmMessage}>Delete this note?</div> : <div className={styles.date}>{new Date(props.date).toLocaleString()}</div> }
    </div>;

    return note;
};

export default Note;