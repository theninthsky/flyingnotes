import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --text-color: #24292e;
    --bg-color: #fafafa;
    --primary-color: #fff;
    --secondary-color: #e1e4e8;
    --placeholder-color: #b4b4b4;
  }

  [data-theme="dark"] {
    --text-color: #f0f6fc;
    --bg-color: #0a0a0a;
    --primary-color: #141414;
    --secondary-color: #1f1f1f;
    --placeholder-color: #787878;
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

  svg {
    fill: currentColor;
  }

  a {
    :visited {
      color: unset;
    }
  }

  select {
    appearance: none;
    padding: 0 30px 0 7.5px;
  }
`

export const Heading = styled.h1`
  position: absolute;
  left: -9999px;
`
