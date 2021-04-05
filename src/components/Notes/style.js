import styled from 'styled-components'

import { VIEWPORT_4 } from 'media-queries'

export const NotesWrap = styled.div`
  width: 95%;
  margin: 15px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media ${VIEWPORT_4} {
    margin-top: 30px;
  }
`
