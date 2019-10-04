import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import styles from './NewNote.module.scss';

const NewNote = props => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const titleHandler = event => setTitle(event.target.value);

    const contentHandler = event => setContent(event.target.value);
    
    const saveNoteHandler = event => {
        event.preventDefault();
        props.onSaveNote({ title: title, content: content });
        setTitle('');
        setContent('');
    };
    
    return (
        <div className={styles.note}>
            <form onSubmit={saveNoteHandler} action="/" method="post" autoComplete="off">
                <input className={styles.title} dir="auto" placeholder="Title" maxLength="40" value={title} onChange={titleHandler} />
                <textarea className={styles.content} dir="auto" placeholder=". . ." value={content} onChange={contentHandler} required></textarea>
                <input className={styles.save} type="submit" value="Save" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onSaveNote: note => dispatch(actions.addNewNote(note))
});

export default connect(null, mapDispatchToProps)(NewNote);