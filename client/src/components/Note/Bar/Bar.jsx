import React from 'react';

import styles from './Bar.module.scss';
import editSymbol from '../../../assets/images/edit.svg';
import deleteSymbol from '../../../assets/images/delete.svg';

const Bar = props => {
    const deleteNote = noteId => props.delete(noteId);
    
    return (
        <div className={styles.bar} style={{backgroundColor: props.color}} >
            <img className={styles.edit} src={editSymbol} alt="Edit" />
            <img className={styles.delete} src={deleteSymbol} alt="Delete" onClick={() => deleteNote(props.id)} />
        </div>
    );
};

export default Bar;