import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'

import { fetchNotes } from '../../store/actions/index'
import Note from '../Note/Note'
import NewNote from '../NewNote/NewNote'

import style from './Notes.module.scss'

const mapStateToProps = state => ({
  app: state.app,
  notes: state.notes,
})

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes()),
})

const Notes = ({ app: { theme, loading, notesFetched, localNotesSet }, notes, fetchNotes }) => {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    if (!notesFetched && !localNotesSet) {
      fetchNotes()
    }
  }, [notesFetched, localNotesSet, fetchNotes])

  const filteredNotes = useMemo(
    () =>
      [...notes]
        .filter(({ category }) => (!categoryFilter ? true : category === categoryFilter))
        .filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter))
        .sort((a, b) => b.date - a.date)
        .map(note => (
          <Note
            key={note._id}
            _id={note._id}
            color={note.color}
            category={note.category}
            title={note.title}
            content={note.content}
            date={note.date}
            fileName={note.fileName}
            file={note.file}
          />
        )),
    [notes, categoryFilter, searchFilter],
  )

  return (
    <>
      {loading || (
        <>
          <div className={style.filters}>
            <select
              className={`${style.categoryFilter} ${theme === 'dark' ? style.categoryFilterDark : ''}`}
              title="Category"
              onChange={event => setCategoryFilter(event.target.value)}
            >
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
            </select>

            <div className={`${style.searchFilter} ${theme === 'dark' ? style.searchFilterDark : ''}`}>
              <i className={'fa fa-search ' + style.searchIcon}></i>
              <input
                className={style.searchBox}
                type="search"
                value={searchFilter}
                placeholder="Search..."
                onChange={event => setSearchFilter(event.target.value.toLowerCase())}
              />
            </div>
          </div>

          <div className={style.notesContainer}>
            <NewNote />
            {filteredNotes}
          </div>
        </>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
