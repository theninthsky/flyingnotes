import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GithubPicker } from 'react-color';

import * as actions from '../../store/actions/index';
import styles from './NewNote.module.scss';
import colorPalette from '../../assets/images/color-palette.svg';

const colorsArray = [
    '#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', 
    '#1273DE', '#004DCF', '#5300EB', '#808080', '#000000'
];

const NewNote = props => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState(props.color || '#006B76');
    const [category, setCategory] = useState(props.category || '');
    const [title, setTitle] = useState(props.title || '');
    const [content, setContent] = useState(props.content || '');

    const colorPickerHandler = () => setShowColorPicker(!showColorPicker);

    const colorChangeHanlder = color => {
        setColor(color.hex);
        setShowColorPicker(false);
    };
    
    const categoryHanlder = event => setCategory(event.target.value.toUpperCase());

    const titleHandler = event => setTitle(event.target.value);

    const contentHandler = event => setContent(event.target.value);
    
    const saveNoteHandler = event => {
        event.preventDefault();
        const note = { _id: props.id, color, category: category.trim(), title: title.trim(), content };
        if (props.update) {
            props.updateNote(note);
            props.toggleEditMode();
            props.closeBar();
        } else {
            props.addNote(note);
            setColor('#006B76');
            setCategory('');
            setTitle('');
            setContent('');
        }
    };
    
    return (
        <div className={styles.note} style={props.theme}>
            <form onSubmit={saveNoteHandler} autoComplete="off">
                <img className={styles.colorPalette} src={colorPalette} alt="Choose color" onClick={colorPickerHandler} />
                { showColorPicker ? 
                    <GithubPicker 
                        className={styles.colorPicker} 
                        width="262px" 
                        triangle="hide" 
                        colors={colorsArray} 
                        onChangeComplete={colorChangeHanlder}
                    /> : 
                    <input 
                        className={styles.category} 
                        type="text" 
                        dir="auto" 
                        placeholder="CATEGORY" 
                        maxLength="24" value={category}
                        title="Optional" 
                        style={{backgroundColor: color}} 
                        onChange={categoryHanlder} 
                    />  }
                <input className={styles.title} type="text" dir="auto" placeholder="Title" value={title} title="Optional" maxLength="60" onChange={titleHandler} />
                <textarea className={styles.content} dir="auto" placeholder=". . ." value={content} onChange={contentHandler} title="Note's content" required></textarea>
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