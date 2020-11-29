import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin: 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  animation: showNewNote 0.5s;
  opacity: ${({ saving }) => (saving ? '0.5' : '1')};
  pointer-events: ${({ saving }) => (saving ? 'none' : 'auto')};

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes showNewNote {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 200px;
    margin: 10px 0;
  }
`
export const Category = styled.input`
  display: block;
  width: 100%;
  padding: 2px 0;
  border: none;
  border-radius: 4px 4px 0 0;
  outline: none;
  font-family: inherit;
  text-align: center;
  font-size: 12px;
  letter-spacing: 3px;
  color: rgb(150, 150, 150);
  background-color: #ffffde;

  &::placeholder {
    color: rgb(190, 190, 190);
  }
`
export const Title = styled.input`
  display: block;
  width: 100%;
  margin: 6px auto;
  margin-bottom: 0;
  padding: 0 5%;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-family: inherit;
  background-color: inherit;
  text-align: center;
  color: inherit;
  font-size: 24px;

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? 'rgb(200, 200, 200)' : 'auto')};
  }
`
export const Content = styled.textarea`
  display: block;
  width: 90%;
  margin: 4px 12px 2.5px 12px;
  padding-bottom: 12.5vh;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  color: inherit;
  background-color: inherit;
  resize: none;
  white-space: pre;
  overflow: auto;

  &::-webkit-scrollbar-thumb {
    visibility: hidden;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }

  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: #999;
    }
  }
`
export const Save = styled.input`
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  text-align: center;
  border-radius: 0 0 4px 4px;
  color: white;
  font-size: 14px;
  background-color: green;
  cursor: pointer;

  &:hover {
    background-color: rgb(44, 179, 44);
  }
`
