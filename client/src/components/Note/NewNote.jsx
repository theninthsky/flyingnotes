import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './NewNote.module.scss';

const NewNote = props => {
    const [groupName, setGroupName] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    
    const groupNameHandler = event => setGroupName(event.target.value);

    const titleHandler = event => setTitle(event.target.value);

    const contentHandler = event => setContent(event.target.value);
    
    const saveNoteHandler = event => {
        event.preventDefault();
        switch (props.path) {
            case '/':
                props.onSavePersonalNote({ title: title, content: content });
                break;
            case '/group-notes':
                props.onSaveGroupNote({ groupName: groupName, title: title, content: content });
                break;
            default:
        }
        
    };
    
    return (
        <div className={styles.note}>
            <form onSubmit={saveNoteHandler} action="/" method="post" autoComplete="off">
                { props.path === '/group-notes' ? <select className={styles.groupName} value={groupName} onChange={groupNameHandler}>
                    <option defaultValue disabled>Choose Group</option>
                    <option>Herolo Workers</option>
                    <option>Fiverr Workers</option>
                </select> : null }
                <input className={styles.title} dir="auto" placeholder="Title" maxLength="40" value={title} onChange={titleHandler} />
                <textarea className={styles.content} dir="auto" placeholder=". . ." value={content} onChange={contentHandler} required></textarea>
                <input className={styles.save} type="submit" value="Save" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onSavePersonalNote: note => dispatch({ type: 'SAVE_PERSONAL_NOTE', note: note }),
    onSaveGroupNote: note => dispatch({ type: 'SAVE_GROUP_NOTE', note: note })
});

export default connect(null, mapDispatchToProps)(NewNote);