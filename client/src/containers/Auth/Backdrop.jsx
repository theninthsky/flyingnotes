import React from 'react';

import './Backdrop.scss';

const Backdrop = props => {
    return (
        <div 
            className="backdrop" 
            style={{ backgroundColor: `rgba(${props.theme === 'light' ? '255, 255, 255' : '0, 0, 0'}, 0.75)` }} 
            onClick={props.toggleAuth} 
        />
    );
};

export default Backdrop;