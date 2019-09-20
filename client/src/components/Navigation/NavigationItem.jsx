import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.scss';

const NavigationItem = props => {
    return (
        <NavLink className={styles.navItem} activeClassName={styles.active} exact to={props.url}>
            {props.children}
        </NavLink>
    );
};

export default NavigationItem;