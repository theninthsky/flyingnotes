import styled from 'styled-components'

export const Wrapper = styled.form`
  position: relative;
  margin: 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
  max-height: 250px;
  border: ${({ theme }) => (theme === 'dark' ? '1px solid #30363d' : '1px solid #e1e4e8')};
  border-radius: 4px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#161b22' : 'white')};
  transition: 0.15s;
  animation: show 0.25s;
  opacity: ${({ saving }) => (saving ? '0.5' : '1')};
  pointer-events: ${({ saving }) => (saving ? 'none' : 'auto')};

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
const Input = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  font-family: inherit;
  color: inherit;
  background-color: inherit;
  text-align: center;

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? '#787878' : '#b4b4b4')};
  }
`
export const Category = styled(Input)`
  padding: 4px;
  border-bottom: ${({ theme }) => (theme === 'dark' ? '1px solid #30363d' : '1px solid #e1e4e8')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#21262d' : '#efefef')};
  border-radius: 4px 4px 0 0;
  font-size: 10px;
  letter-spacing: 3px;
`
export const Title = styled(Input)`
  margin: 6px 12px 0;
  padding: 0;
  font-size: 18px;
  font-weight: bold;
`
export const Content = styled.textarea`
  margin: 6px 12px 10px;
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
  width: 80px;
  margin: 0 auto;
  padding: 4px 0;
  border: ${({ theme }) => (theme === 'dark' ? '1px solid #30363d' : '1px solid #e1e4e8')};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
  text-align: center;
  color: inherit;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21262d' : '#efefef')};
  font-size: 12px;
  cursor: pointer;

  &:hover {
    border-color: #b4b4b4;
  }
`
