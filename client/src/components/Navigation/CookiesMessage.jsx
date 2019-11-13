import React from 'react';

import './CookiesMessage.scss';

const CookiesMessage = props => {
    return (
        <div 
            className="cookiesMessage" 
            style={{backgroundColor: props.theme === 'light' ? 'rgb(240, 240, 240)' : 'rgb(32, 32 , 32)'}} 
            onClick={() => props.toggle(false)}
        >
            Notes are saved as cookies and will be lost if you clear the browser's data. Login to have your notes saved on the cloud.
        </div>
    );
};

export default CookiesMessage;