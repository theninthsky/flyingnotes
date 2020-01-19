import React from 'react';

import './CookiesMessage.scss';

const CookiesMessage = props => {
    return (
        <div 
            className={`cookiesMessage ${props.theme === 'dark' ? 'cookiesMessageDark' : ''}`}
            onClick={() => props.toggle(false)}
        >
            Notes are saved as cookies and will be lost if you clear the browser's data. Login to have your notes and files saved on the cloud.
        </div>
    );
};

export default CookiesMessage;