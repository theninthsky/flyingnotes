import styled from 'styled-components'

import { VIEWPORT_4, NOT_MOBILE } from 'media-queries'

import Download from 'images/download.svg'

export const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: var(--primary-color);
  opacity: ${({ transparent }) => (transparent ? '0.5' : '1')};
  pointer-events: ${({ transparent }) => (transparent ? 'none' : 'auto')};
  animation: showFile 0.25s;

  @keyframes showFile {
    from {
      opacity: 0;
    }
  }

  @media ${VIEWPORT_4} {
    width: 400px;
    margin: 20px;
  }
`
export const DownloadIcon = styled(Download)`
  width: 15px;
  margin-right: 10px;
  text-align: center;
  cursor: ${({ downloading }) => (downloading ? 'default' : 'pointer')};
  pointer-events: ${({ downloading }) => (downloading ? 'none' : 'auto')};
  animation: ${({ downloading }) => (downloading ? 'loading 0.75s infinite alternate' : 'none')};

  @media ${NOT_MOBILE} {
    :hover {
      opacity: 0.5;
    }
  }

  @keyframes loading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.25;
    }
  }
`
