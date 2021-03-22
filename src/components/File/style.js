import styled from 'styled-components'

import { VIEWPORT_4, NOT_MOBILE } from 'media-queries'

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
export const Name = styled.input`
  flex-grow: 1;
  margin: 0 10px;
  border: none;
  outline: none;
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  font-size: 16px;

  &::placeholder {
    color: var(--placeholder-color);
  }
`
export const Extension = styled.div`
  margin-right: 15px;
  font-size: 12px;

  @media ${VIEWPORT_4} {
    font-size: 16px;
  }
`
export const InfoWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 30%;
  height: 100%;
  font-size: 12px;

  @media ${VIEWPORT_4} {
    font-size: 16px;
  }
`
export const FileSelect = styled.img`
  width: 15px;
  margin-right: 10px;
  cursor: pointer;

  @media ${NOT_MOBILE} {
    &:hover {
      opacity: 0.5;
    }
  }
`
export const Upload = styled.input`
  height: 100%;
  padding: 0 10px;
  border: none;
  border-radius: 0 4px 4px 0;
  outline: none;
  font-family: inherit;
  color: inherit;
  background-color: var(--secondary-color);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }
`
export const Download = styled.img`
  width: 15px;
  margin-right: 10px;
  text-align: center;
  cursor: ${({ downloading }) => (downloading ? 'default' : 'pointer')};
  pointer-events: ${({ downloading }) => (downloading ? 'none' : 'auto')};
  animation: ${({ downloading }) => (downloading ? 'loading 0.75s infinite alternate' : 'none')};

  @media ${NOT_MOBILE} {
    &:hover {
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
export const Delete = styled.img`
  width: 14px;
  margin-right: 15px;
  cursor: pointer;
  animation: showDelete 0.25s;

  @media ${NOT_MOBILE} {
    &:hover {
      opacity: 0.5;
    }
  }

  @keyframes showDelete {
    from {
      opacity: 0;
    }
  }
`
