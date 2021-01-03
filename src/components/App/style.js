import { createGlobalStyle } from 'styled-components'

import magnifyingGlassBlackIcon from 'assets/images/magnifying-glass-black.svg'
import magnifyingGlassWhiteIcon from 'assets/images/magnifying-glass-white.svg'

export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  
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

  img {
    user-select: none;
  }

  a {
    &:visited {
      color: unset;
    }
  }
`
