import React from 'react';

import './Backdrop.scss';

const Backdrop = props => {
    return (
        <div 
            className={`backdrop ${props.theme === 'dark' ? 'backdropDark' : ''}`}
            onClick={() => { props.toggleAuth(); props.clearError(); }} 
        />
    );
};

export default Backdrop;