import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Bar from './Bar/Bar';
import styles from './Note.module.scss';

const Note = props => {
    const [showBar, setShowBar] = useState(false);
    
    useEffect(() => console.log('[Note] rendered!'));
    
    return (
        <div className={styles.note} onMouseEnter={() => setShowBar(true)} onMouseLeave={() => setShowBar(false)}>
            { showBar ? <Bar color={props.color} id={props.id || props.date} delete={props.deleteNote} /> : 
                props.category ? <div className={styles.category} dir="auto" style={{backgroundColor: props.color}} >{props.category}</div> : 
                null }
            { props.title ? <h1 className={styles.title} dir="auto">{props.title}</h1> : null }
            <div className={styles.content} dir="auto">{props.content}</div>
            <div className={styles.date}>{new Date(props.date).toLocaleString()}</div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteNote: noteId => dispatch(actions.deleteNote(noteId))
});

export default connect(null, mapDispatchToProps)(Note);