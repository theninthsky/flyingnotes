import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-tap-highlight-color: transparent;
  }  

  body {
    color: ${({ theme }) => (theme === 'dark' ? '#d2d2d2' : '#505050')};
    background-color: ${({ theme }) => (theme === 'dark' ? '#0d1117' : '#fafafa')};
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
