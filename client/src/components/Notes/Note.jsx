import React, { useState } from 'react';

import Options from './Options';
import NewNote from './NewNote';
import styles from './Note.module.scss';

const Note = props => {
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);

    const toggleOptionsHandler = mode => setShowOptions(mode);

    const toggleConfirmMessageHanlder = mode => setShowConfirmMessage(mode);

    const toggleEditModeHandler = () => setEditMode(!editMode);

    const note = editMode ?
        <NewNote
            {...props}
            toggleEditMode={toggleEditModeHandler}
            closeOptions={() => toggleOptionsHandler(false)}
            update
        /> :
        <div
            className={`${styles.note} ${props.theme === 'dark' ? styles.noteDark : ''}`}
            onMouseMove={() => toggleOptionsHandler(true)}
            onMouseLeave={() => { toggleOptionsHandler(false); toggleConfirmMessageHanlder(false); }}
        >
            <div className={styles.categoryBackground} style={{ backgroundColor: props.color }}>&nbsp;</div>
            <div className={styles.category} dir="auto">{props.category}</div>
            {props.title ? <h1 className={styles.title} dir="auto">{props.title}</h1> : null}
            <div className={styles.content} dir="auto">{props.content}</div>
            {showOptions ? <Options id={props.id} edit={toggleEditModeHandler} toggleConfirmMessage={toggleConfirmMessageHanlder} /> : null}
            {showConfirmMessage ?
                <div className={styles.confirmMessage}>Delete this note?</div> :
                <div className={`${styles.date} ${props.theme === 'dark' ? styles.dateDark : ''}`}>{new Date(props.date).toLocaleString()}</div>}
        </div>;

    return note;
};

export default Note;