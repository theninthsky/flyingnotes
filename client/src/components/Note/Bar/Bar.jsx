import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import styles from './Bar.module.scss';
import editSymbol from '../../../assets/images/edit.svg';
import deleteSymbol from '../../../assets/images/delete.svg';
import confirmSymbol from '../../../assets/images/confirm.svg';
import cancelSymbol from '../../../assets/images/cancel.svg';

const Bar = props => {
    const [showConfirm, setShowConfirm] = useState(false);

    const deletePressedHandler = mode => {
        setShowConfirm(mode);
        props.showConfirmMessage(mode);
    };
    
    return (
        <div className={styles.bar}>
            { showConfirm ?
                <>
                    <img className={styles.confirm} src={confirmSymbol} alt="Confirm" title="Confirm" onClick={() => props.deleteNote(props.id)} />
                    <img className={styles.cancel} src={cancelSymbol} alt="Cancel" title="Cancel" onClick={() => deletePressedHandler(false)} />
                </> :
                <>
                    <img className={styles.edit} src={editSymbol} alt="Edit" title="Edit" onClick={props.edit} />
                    <img className={styles.delete} src={deleteSymbol} alt="Delete" title="Delete" onClick={() => deletePressedHandler(true)} />
                </>
             }
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteNote: noteId => dispatch(actions.deleteNote(noteId))
});

export default connect(null, mapDispatchToProps)(Bar);