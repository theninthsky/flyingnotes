import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';

import * as actions from '../../store/actions/index';
import Options from './Options';
import NewNote from './NewNote';
import Spinner from '../UI/Spinner';
import styles from './Note.module.scss';

import paperClip from '../../assets/images/paper-clip.svg';

const base64ToFile = (content, type) => {
    const byteString = atob(content.split`,`[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], { type });
    return newBlob;
};

const Note = props => {
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);

    const toggleOptionsHandler = mode => setShowOptions(showConfirmMessage ? true : mode);

    const toggleConfirmMessageHanlder = mode => setShowConfirmMessage(mode);

    const toggleEditModeHandler = () => setEditMode(!editMode);

    const downloadFileHandler = () => {
        if (props.file.content) {
            const type = props.file.content.split`,`[0].split`:`[1];
            const content = base64ToFile(props.file.content, type);
            saveAs(content, props.file.name);
        } else {
            const { id: _id, color, category, title, content, date } = props;
            props.fetchFile({ _id, color, category, title, content, date });
        }
    };

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
            onMouseLeave={() => toggleOptionsHandler(false)}
        >
            {props.category ?
                <>
                    <div className={styles.categoryBackground} style={{ backgroundColor: props.color }}>&nbsp;</div>
                    <div className={styles.category} dir="auto">{props.category}</div>
                </> : null}
            {props.title ? <h1 className={styles.title} dir="auto">{props.title}</h1> : null}
            <div className={styles.content} dir="auto">{props.content}</div>
            {props.file ?
                props.fetchingFile ?
                    <Spinner /> :
                    <img
                        className={`${styles.paperClip} ${props.theme === 'dark' ? styles.paperClipDark : ''}`}
                        src={paperClip}
                        alt={props.file.name}
                        title={props.file.name}
                        onClick={downloadFileHandler}
                    /> :
                null}

            {showOptions ? <Options id={props.id} edit={toggleEditModeHandler} toggleConfirmMessage={toggleConfirmMessageHanlder} /> : null}
            {showConfirmMessage ?
                <div className={styles.confirmMessage}>Delete this note?</div> :
                <div
                    className={styles.date}>
                    {new Date(props.date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}
                </div>}
        </div>;

    return note;
};

const mapStateToProps = state => ({
    fetchingFile: state.user.fetchingFile
});

const mapDispatchToProps = dispatch => ({
    fetchFile: note => dispatch(actions.fetchFile(note))
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);