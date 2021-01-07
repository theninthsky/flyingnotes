import styled, { createGlobalStyle } from 'styled-components'

import arrowLightIcon from 'images/arrow-light.svg'
import arrowLDarkIcon from 'images/arrow-dark.svg'
import magnifyingGlassLightIcon from 'images/magnifying-glass-light.svg'
import magnifyingGlassDarkIcon from 'images/magnifying-glass-dark.svg'

export const GlobalStyle = createGlobalStyle`
  :root {
    --text-color: #24292e;
    --bg-color: #fafafa;
    --primary-color: white;
    --secondary-color: #e1e4e8;
    --placeholder-color: #b4b4b4;
    --magnifying-glass-icon: url(${magnifyingGlassDarkIcon});
    --select-arrow-icon: url(${arrowLDarkIcon});
  }

  [data-theme="dark"] {
    --text-color: #f0f6fc;
    --bg-color: #0d1117;
    --primary-color: #161b22;
    --secondary-color: #30363d;
    --placeholder-color: #787878;
    --magnifying-glass-icon: url(${magnifyingGlassLightIcon});
    --select-arrow-icon: url(${arrowLightIcon});
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    color: var(--text-color);
    background-color: var(--bg-color);
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
    background-image: var(--select-arrow-icon);
    background-position: right 7.5px top 50%;
    background-repeat: no-repeat;
  }
`

export const Heading = styled.h1`
  position: absolute;
  left: -9999px;
`
