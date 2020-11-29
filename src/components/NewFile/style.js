import styled from 'styled-components'

export const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 34px;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ uploading }) => (uploading ? '0.5' : '1')};
  pointer-events: ${({ uploading }) => (uploading ? 'none' : 'auto')};
  transition: 0.2s;
  animation: showNewFile 0.5s;

  &:hover {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes showNewFile {
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
export const Category = styled.input`
  width: 25%;
  padding: 9px 5px;
  text-align: center;
  border: none;
  border-radius: 4px 0 0 4px;
  outline: none;
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 3px;
  color: rgb(150, 150, 150);
  background-color: #ffffde;

  &::placeholder {
    color: rgb(190, 190, 190);
  }
`
export const Name = styled.input`
  width: 50%;
  margin: 0 10px;
  padding: 0;
  border: none;
  outline: none;
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  font-size: 18px;

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? 'rgb(200, 200, 200)' : 'auto')};
  }
`
export const InfoWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25%;
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
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
export const FileInput = styled.input`
  display: none;
`
export const Upload = styled.input`
  padding: 0;
  border: none;
  outline: none;
  font-family: inherit;
  color: red;
  background-color: inherit;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`
