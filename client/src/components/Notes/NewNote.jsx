import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GithubPicker } from 'react-color';

import * as actions from '../../store/actions/index';
import styles from './NewNote.module.scss';
import colorPalette from '../../assets/images/color-palette.svg';
import paperClip from '../../assets/images/paper-clip.svg';

const colorsArray = [
    '#c0392b', '#d35400', '#f39c12', '#27ae60', '#16a085',
    '#2980b9', '#8e44ad', '#2c3e50', '#7f8c8d', '#bdc3c7'
];

const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const NewNote = props => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState(props.color || colorsArray[Math.floor(Math.random() * 10)]);
    const [category, setCategory] = useState(props.category || '');
    const [title, setTitle] = useState(props.title || '');
    const [showContent, setShowContent] = useState(props.id ? true : false);
    const [content, setContent] = useState(props.content || '');
    const [selectedFile, setSelectedFile] = useState(props.file || null);

    const colorHanlder = color => {
        setColor(color.hex);
        setShowColorPicker(false);
    };

    const categoryHanlder = event => setCategory(event.target.value.toUpperCase().slice(0, 24)); // forces maxLength on mobile

    const titleHandler = event => setTitle(event.target.value);

    const contentHandler = event => setContent(event.target.value);

    const fileHandler = event => {
        const file = event.target.files[0];
        if (file) {
            if (file.size <= 2 * 1024 * 1024) {
                fileToBase64(file).then(encoded => setSelectedFile({ name: file.name, content: encoded }));
            } else {
                alert('File size exceeds 2MB');
                setSelectedFile(null);
                document.querySelector('input[type="file"]').value = '';
            }
        } else {
            setSelectedFile(null);
        }
    };

    const saveNoteHandler = event => {
        event.preventDefault();
        const note = { _id: props.id, color, category: category.trim(), title: title.trim(), content, file: selectedFile };
        if (props.update) {
            props.updateNote(note);
            props.toggleEditMode();
            props.closeOptions();
        } else {
            props.addNote(note);
            setColor('#006B76');
            setCategory('');
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className={`${styles.note} ${props.theme === 'dark' ? styles.noteDark : ''}`} onMouseMove={() => setShowContent(true)}>
            <form onSubmit={saveNoteHandler} autoComplete="off">
                <img className={styles.colorPalette} src={colorPalette} alt="Choose color" onClick={() => setShowColorPicker(!showColorPicker)} />
                {showColorPicker ?
                    <GithubPicker
                        className={styles.colorPicker}
                        width="262px"
                        triangle="hide"
                        colors={colorsArray}
                        onChangeComplete={colorHanlder}
                    /> :
                    <>
                        <div className={styles.categoryBackground} style={{ backgroundColor: color }}>
                            &nbsp;
                        </div>
                        <input
                            className={styles.category}
                            type="text"
                            value={category}
                            dir="auto"
                            placeholder="CATEGORY"
                            maxLength="24"
                            title="Optional"
                            onChange={categoryHanlder}
                        />
                    </>}
                <input
                    className={`${styles.title} ${props.theme === 'dark' ? styles.titleDark : ''}`}
                    type="text"
                    dir="auto"
                    placeholder="Title"
                    value={title}
                    title="Optional"
                    maxLength="60"
                    onChange={titleHandler}
                />
                {showContent ?
                    <>
                        <textarea
                            className={styles.content}
                            dir="auto"
                            value={content}
                            title="Note's content"
                            required
                            onChange={contentHandler}
                        >
                        </textarea>
                        {localStorage.name ?
                            <>
                                <input className={styles.file} type="file" onChange={fileHandler} />
                                <img
                                    className={`${styles.paperClip} ${props.theme === 'dark' ? styles.paperClipDark : ''}`}
                                    src={paperClip}
                                    alt="Upload a File"
                                    title="Upload a File"
                                />
                            </> :
                            null}
                    </> :
                    null}
                <input className={styles.save} type="submit" value="SAVE" />
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(actions.addNote(note)),
    updateNote: note => dispatch(actions.updateNote(note))
});

export default connect(null, mapDispatchToProps)(NewNote);