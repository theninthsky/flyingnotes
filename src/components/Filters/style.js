import styled from 'styled-components'

import { VIEWPORT_4 } from 'media-queries'

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
  background: var(--magnifying-glass-icon) no-repeat 7.5px scroll transparent;

  &::placeholder {
    color: var(--placeholder-color);
  }
`
