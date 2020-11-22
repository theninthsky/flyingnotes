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
  width: 15%;
  border-radius: 5px 0 0 5px;
  outline: none;
  cursor: pointer;
  border: 0.5px solid #ccc;
  color: inherit;
  background-color: ${({ theme }) => (theme === 'dark' ? '#222' : 'white')};
`
export const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid #ccc;
  border-radius: 0 5px 5px 0;
  color: inherit;
  background-color: inherit;
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
    color: ${({ theme }) => (theme === 'dark' ? 'rgb(200, 200, 200)' : 'auto')};
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
