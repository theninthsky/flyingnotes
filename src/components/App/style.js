import styled, { createGlobalStyle } from 'styled-components'

import themeLightIcon from 'images/theme-light.svg'
import themeDarkIcon from 'images/theme-dark.svg'
import userLightIcon from 'images/user-astronaut-light.svg'
import userDarkIcon from 'images/user-astronaut-dark.svg'
import arrowLightIcon from 'images/arrow-light.svg'
import arrowLDarkIcon from 'images/arrow-dark.svg'
import magnifyingGlassLightIcon from 'images/magnifying-glass-light.svg'
import magnifyingGlassDarkIcon from 'images/magnifying-glass-dark.svg'
import pinUncheckedLightIcon from 'images/pin-unchecked-light.svg'
import pinCheckedLightIcon from 'images/pin-checked-light.svg'
import pinUncheckedDarkIcon from 'images/pin-unchecked-dark.svg'
import pinCheckedDarkIcon from 'images/pin-checked-dark.svg'
import itemUncheckedLightIcon from 'images/item-unchecked-light.svg'
import itemCheckedLightIcon from 'images/item-checked-light.svg'
import itemUncheckedDarkIcon from 'images/item-unchecked-dark.svg'
import itemCheckedDarkIcon from 'images/item-checked-dark.svg'

export const GlobalStyle = createGlobalStyle`
  :root {
    --text-color: #24292e;
    --bg-color: #fafafa;
    --primary-color: white;
    --secondary-color: #e1e4e8;
    --placeholder-color: #b4b4b4;
    --theme-icon: url(${themeLightIcon});
    --user-icon: url(${userDarkIcon});
    --magnifying-glass-icon: url(${magnifyingGlassDarkIcon});
    --select-arrow-icon: url(${arrowLDarkIcon});
    --pin-unchecked-icon: url(${pinUncheckedDarkIcon});
    --pin-checked-icon: url(${pinCheckedDarkIcon});
    --item-unchecked-icon: url(${itemUncheckedDarkIcon});
    --item-checked-icon: url(${itemCheckedDarkIcon});
  }

  [data-theme="dark"] {
    --text-color: #f0f6fc;
    --bg-color: #0d1117;
    --primary-color: #161b22;
    --secondary-color: #30363d;
    --placeholder-color: #787878;
    --theme-icon: url(${themeDarkIcon});
    --user-icon: url(${userLightIcon});
    --magnifying-glass-icon: url(${magnifyingGlassLightIcon});
    --select-arrow-icon: url(${arrowLightIcon});
    --pin-unchecked-icon: url(${pinUncheckedLightIcon});
    --pin-checked-icon: url(${pinCheckedLightIcon});
    --item-unchecked-icon: url(${itemUncheckedLightIcon});
    --item-checked-icon: url(${itemCheckedLightIcon});
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
