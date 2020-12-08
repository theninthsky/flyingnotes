import styled from 'styled-components'

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  font-family: inherit;
  background-color: inherit;
  text-align: center;
  color: inherit;

  &::placeholder {
    color: rgb(180, 180, 180);
  }
`

export const Wrapper = styled.form`
  position: relative;
  margin: 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  animation: show 0.25s;
  opacity: ${({ saving }) => (saving ? '0.5' : '1')};
  pointer-events: ${({ saving }) => (saving ? 'none' : 'auto')};

  &:hover {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
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
export const Category = styled(Input)`
  padding: 1px;
  border-radius: 4px 4px 0 0;
  font-size: 12px;
  letter-spacing: 3px;
  color: rgb(150, 150, 150);
  background-color: #ffffde;
`
export const Title = styled(Input)`
  margin: 2px 12px 0;
  padding: 0;
  font-size: 24px;
`
export const Content = styled.textarea`
  margin: 2px 12px 10px;
  padding: 0;
  border: none;
  outline: none;
  resize: none;
  white-space: pre;
  font-family: inherit;
  font-size: 16px;
  color: inherit;
  background-color: inherit;

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
  border: none;
  border-radius: 0 0 4px 4px;
  outline: none;
  font-family: inherit;
  text-align: center;
  color: white;
  font-size: 14px;
  background-color: green;
  cursor: pointer;

  &:hover {
    background-color: rgb(44, 179, 44);
  }
`
