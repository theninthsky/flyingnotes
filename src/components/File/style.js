import styled from 'styled-components'

export const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 26px;
  margin: 20px;
  padding: 4px 0;
  border: ${({ theme }) => (theme === 'dark' ? '1px solid #30363d' : '1px solid #e1e4e8')};
  border-radius: 4px;
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
  font-size: 18px;

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? '#787878' : '#b4b4b4')};
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
  padding: 0 4px;
  border: none;
  border-radius: 0 4px 4px 0;
  outline: none;
  font-family: inherit;
  color: white;
  background-color: red;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    font-size: 10px;
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
