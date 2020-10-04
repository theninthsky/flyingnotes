import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Note from './Note'
import NewNote from './NewNote'

// #region Styles
const Filters = styled.div`
  margin: 20px auto;
  width: 25vw;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 70vw;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`
const CategoryFilter = styled.select`
  width: 15%;
  border-radius: 5px 0 0 5px;
  outline: none;
  cursor: pointer;
  border: 0.5px solid #ccc;
  color: inherit;
  background-color: ${({ theme }) => (theme === 'dark' ? '#222' : 'white')};
`
const SearchFilter = styled.div`
  border: 0.5px solid #ccc;
  border-radius: 0 5px 5px 0;
  color: inherit;
  background-color: inherit;
`
const SearchIcon = styled.i`
  padding: 0.5rem;
`
const SearchBox = styled.input`
  border: none;
  color: inherit;
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? 'rgb(200, 200, 200)' : 'auto')};
  }
`
const NotesWrap = styled.div`
  margin: 0 auto;
  width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`
// #endregion

const mapStateToProps = state => ({
  app: state.app,
  notes: state.notes,
})

const Notes = ({ app: { theme, loading }, notes }) => {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const filteredNotes = useMemo(
    () =>
      [...notes]
        .filter(({ category }) => (!categoryFilter ? true : category === categoryFilter))
        .filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(note => (
          <Note
            key={note._id}
            _id={note._id}
            category={note.category}
            title={note.title}
            content={note.content}
            date={note.date}
          />
        )),
    [notes, categoryFilter, searchFilter],
  )

  return (
    <>
      {loading || (
        <>
          <Filters>
            <CategoryFilter theme={theme} title="Category" onChange={event => setCategoryFilter(event.target.value)}>
              <option defaultValue value="">
                ALL
              </option>
              {notes
                .sort((a, b) => a.category.localeCompare(b.category))
                .filter(
                  ({ category }, ind, notes) => category && category !== (notes[ind + 1] && notes[ind + 1].category),
                )
                .map(({ category, _id }) => (
                  <option key={_id}>{category}</option>
                ))}
            </CategoryFilter>

            <SearchFilter>
              <SearchIcon className="fa fa-search"></SearchIcon>
              <SearchBox
                theme={theme}
                type="search"
                value={searchFilter}
                placeholder="Search..."
                onChange={event => setSearchFilter(event.target.value.toLowerCase())}
              />
            </SearchFilter>
          </Filters>

          <NotesWrap>
            <NewNote />
            {filteredNotes}
          </NotesWrap>
        </>
      )}
    </>
  )
}

export default connect(mapStateToProps)(Notes)
