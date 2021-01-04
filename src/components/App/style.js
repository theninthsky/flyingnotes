import styled, { createGlobalStyle } from 'styled-components'

import magnifyingGlassBlackIcon from 'images/magnifying-glass-black.svg'
import magnifyingGlassWhiteIcon from 'images/magnifying-glass-white.svg'
import arrowIcon from 'images/arrow.svg'

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-color: #505050;
    --bg-color: #fafafa;
    --primary-color: white;
    --secondary-color: #e1e4e8;
    --placeholder-color: #b4b4b4;
    --magnifying-glass-icon: url(${magnifyingGlassBlackIcon});
  }

  [data-theme="dark"] {
    --font-color: #d2d2d2;
    --bg-color: #0d1117;
    --primary-color: #161b22;
    --secondary-color: #30363d;
    --placeholder-color: #787878;
    --magnifying-glass-icon: url(${magnifyingGlassWhiteIcon});
  }

  body {
    color: var(--font-color);
    background-color: var(--bg-color);
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  }

  * {
    -webkit-tap-highlight-color: transparent;
  }
  
  img {
    user-select: none;
  }

  a {
    &:visited {
      color: unset;
    }
  }

  select {
    appearance: none;
    padding: 0 30px 0 7.5px;
    background-image: url(${arrowIcon});
    background-position: right 7.5px top 50%;
    background-repeat: no-repeat;
  }
`

export const Heading = styled.h1`
  position: absolute;
  left: -9999px;
`
