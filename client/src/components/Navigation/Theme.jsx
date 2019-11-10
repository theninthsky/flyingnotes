import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import styles from './Theme.module.scss';
import sunSymbol from '../../assets/images/sun.svg';
import moonSymbol from '../../assets/images/moon.svg';

const Theme = props => {
    return props.theme === 'light' ?
        <img className={styles.symbol + ' ' + styles.sun} src={sunSymbol} alt="Light" title="Theme" onClick={() => props.onChangeTheme('dark')} /> :
        <img className={styles.symbol + ' ' + styles.moon} src={moonSymbol} alt="Dark" title="Theme" onClick={() => props.onChangeTheme('light')} />;
};

const mapStateToProps = state => ({
    theme: state.user.theme
});

const mapDispatchToProps = dispatch => ({
    onChangeTheme: theme => dispatch(actions.changeTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);