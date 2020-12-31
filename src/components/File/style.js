import styled from 'styled-components'

export const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 36px;
  margin: 20px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: var(--primary-color);
  opacity: ${({ transparent }) => (transparent ? '0.5' : '1')};
  pointer-events: ${({ transparent }) => (transparent ? 'none' : 'auto')};
  transition: 0.15s;
  animation: show 0.25s;

  &:hover {
    border-color: #b4b4b4;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 10px 0;
  }
`
export const Name = styled.input`
  width: 100%;
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

  @media (max-width: 480px) {
    font-size: 12px;
  }
`
export const InfoWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  @media (max-width: 480px) {
    width: 25%;
    font-size: 12px;
  }
`
export const FileLabel = styled.label`
  height: 15px;
`
export const FileSelect = styled.img`
  width: 15px;
  margin-right: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
export const FileInput = styled.input`
  display: none;
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
  margin-right: 6px;
  text-align: center;
  cursor: ${({ downloading }) => (downloading ? 'default' : 'pointer')};
  pointer-events: ${({ downloading }) => (downloading ? 'none' : 'auto')};
  animation: ${({ downloading }) => (downloading ? 'loading 0.75s infinite alternate' : 'none')};

  &:hover {
    opacity: 0.5;
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
  animation: show 0.25s;

  &:hover {
    opacity: 0.5;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
