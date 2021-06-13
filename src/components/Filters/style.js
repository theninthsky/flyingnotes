import styled from 'styled-components'

import { VIEWPORT_4 } from 'media-queries'

import MagnifyingGlass from 'images/magnifying-glass.svg'

export const Wrapper = styled.div`
  width: 80vw;
  max-width: 400px;
  margin: 25px auto 0;
  height: 32px;
  display: flex;
  justify-content: center;

  @media ${VIEWPORT_4} {
    margin-top: 50px;
  }
`
export const CategoryFilter = styled.select`
  width: 75px;
  border-radius: 5px 0 0 5px;
  outline: none;
  cursor: pointer;
  border: 1px solid var(--secondary-color);
  letter-spacing: 1px;
  font-size: 14px;
  color: inherit;
  background-color: var(--primary-color);

  @media ${VIEWPORT_4} {
    width: 90px;
  }
`
export const SearchFilter = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
  border: 1px solid var(--secondary-color);
  border-radius: 0 5px 5px 0;
  background-color: var(--primary-color);
`

export const SearchBox = styled.input`
  width: 100%;
  height: 50%;
  padding-left: 30px;
  border: none;
  color: inherit;
  outline: none;
  background-color: transparent;

  ::placeholder {
    color: var(--placeholder-color);
  }
`
export const MagnifyingGlassIcon = styled(MagnifyingGlass)`
  position: absolute;
  left: 7.5px;
  width: 15px;
`
