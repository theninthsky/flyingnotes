import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 34px;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ deleting }) => (deleting ? '0.5' : '1')};
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  transition: 0.2s;
  animation: showFile 0.5s;

  &:hover {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes showFile {
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
export const Category = styled.div`
  width: 25%;
  padding: 9px 5px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(150, 150, 150);
  background-color: #ffffde;

  @media (max-width: 480px) {
    max-width: 40%;
  }
`
export const Name = styled.h1`
  max-width: 100%;
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: normal;
`
export const InfoWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 15%;
  height: 100%;
`
export const Extension = styled.div`
  @media (max-width: 480px) {
    font-size: 12px;
  }
`
export const Download = styled.img`
  width: 15px;
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
  opacity: 1;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
