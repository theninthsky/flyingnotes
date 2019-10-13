import React from 'react';

import styles from './Backdrop.module.scss';

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.toggleAuth} />
};

export default Backdrop;