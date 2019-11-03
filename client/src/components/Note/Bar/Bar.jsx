import React from 'react';

import styles from './Bar.module.scss';
import editSymbol from '../../../assets/images/edit.svg';
import deleteSymbol from '../../../assets/images/delete.svg';

const Bar = props => {
    return (
        <div className={styles.bar}>
            <img className={styles.edit} src={editSymbol} alt="Edit" title="Edit" onClick={props.edit} />
            <img className={styles.delete} src={deleteSymbol} alt="Delete" title="Delete" onClick={() => props.delete(props.id)} />
        </div>
    );
};

export default Bar;