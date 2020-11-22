import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100vh; // fixes gradient on mobile
  }

  body {
    margin: 0;
    color: ${({ theme }) => (theme === 'light' ? 'rgb(80, 80, 80)' : 'white')};
    background: ${({ theme }) => (theme === 'light' ? 'initial' : 'linear-gradient(#202020, #404040) fixed')};
    animation: showApp 0.5s;

    @keyframes showApp {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  img {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    &:visited {
      color: unset;
    }
  }
`
