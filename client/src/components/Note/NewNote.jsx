import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import styles from './NewNote.module.scss';

const NewNote = props => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('');

    const titleHandler = event => setTitle(event.target.value);

    const contentHandler = event => setContent(event.target.value);
    
    const saveNoteHandler = event => {
        event.preventDefault();
        props.onSaveNote({ userId: localStorage.userId, category, title, content, color });
        setCategory('');
        setTitle('');
        setContent('');
        setColor('');
    };
    
    return (
        <div className={styles.note}>
            <form onSubmit={saveNoteHandler} autoComplete="off">
                <input className={styles.title} dir="auto" placeholder="Title" maxLength="40" value={title} onChange={titleHandler} />
                <textarea className={styles.content} dir="auto" placeholder=". . ." value={content} onChange={contentHandler} required></textarea>
                <input className={styles.save} type="submit" value="Save" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onSaveNote: note => dispatch(actions.addNote(note))
});

export default connect(null, mapDispatchToProps)(NewNote);