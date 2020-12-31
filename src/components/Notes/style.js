import styled from 'styled-components'

import magnifyingGlassBlackIcon from '../../assets/images/magnifying-glass-black.svg'
import magnifyingGlassWhiteIcon from '../../assets/images/magnifying-glass-white.svg'

export const Filters = styled.div`
  margin: 20px auto;
  width: 25vw;
  height: 32px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 70vw;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`
export const CategoryFilter = styled.select`
  padding: 0 2px;
  border-radius: 5px 0 0 5px;
  outline: none;
  cursor: pointer;
  border: ${({ theme }) => (theme === 'dark' ? '1px solid #30363d' : '1px solid #e1e4e8')};
  letter-spacing: 1px;
  color: inherit;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21262d' : '#efefef')};
`
export const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  border: ${({ theme }) => (theme === 'dark' ? '1px solid #30363d' : '1px solid #e1e4e8')};
  border-radius: 0 5px 5px 0;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21262d' : '#efefef')};
`

export const SearchBox = styled.input`
  height: 50%;
  padding-left: 30px;
  border: none;
  color: inherit;
  outline: none;
  background: ${({ theme }) =>
    `url(${
      theme === 'dark' ? magnifyingGlassWhiteIcon : magnifyingGlassBlackIcon
    }) no-repeat 7.5px scroll transparent`};

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? '#787878' : '#b4b4b4')};
  }
`
export const NotesWrap = styled.div`
  margin: 0 auto;
  width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`
