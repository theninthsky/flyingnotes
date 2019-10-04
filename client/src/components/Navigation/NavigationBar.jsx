import React from 'react';

import NavigationItem from './NavigationItem';
import styles from './NavigationBar.module.scss';
import userImage from '../../assets/images/user.svg';
import rssImage from '../../assets/images/rss.svg';

const NavigationBar = () => {
    return (
        <div className={styles.navBar}>
            <NavigationItem url="/"><img className={styles.icon} src={userImage} alt="" />My Notes</NavigationItem>
            <NavigationItem url="/rss-notes"><img className={styles.icon} src={rssImage} alt="" />RSS Notes</NavigationItem>
        </div>
    );
};

export default NavigationBar;