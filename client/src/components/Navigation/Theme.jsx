import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import styles from './Theme.module.scss';

const Theme = props => {
    return (
        <div className={styles.container}>
            <div className={styles.light} onClick={() => props.onChangeTheme('light')}></div>
            <div className={styles.dark} onClick={() => props.onChangeTheme('dark')}></div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onChangeTheme: theme => dispatch(actions.changeTheme(theme))
});

export default connect(null, mapDispatchToProps)(Theme);