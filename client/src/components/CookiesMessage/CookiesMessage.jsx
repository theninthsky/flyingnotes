import React from 'react'

import './CookiesMessage.scss'

export default ({theme, toggle}) => {
  return (
    <div
      className={`cookiesMessage ${
        theme === 'dark' ? 'cookiesMessageDark' : ''
      }`}
      onClick={() => toggle(false)}
    >
      Notes are saved as cookies and will be lost if you clear the browser's
      data. Login to have your notes and files saved on the cloud.
    </div>
  )
}
