import { useState, useMemo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import NewNote from './NewNote'
import Note from './Note'
import { Filters, CategoryFilter, SearchFilter, SearchBox, NotesWrap } from './style'

const Notes = () => {
  const { theme, loading, notes } = useSelector(
    ({ app: { theme, loading }, notes }) => ({ theme, loading, notes }),
    shallowEqual,
  )

  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const filteredNotes = useMemo(
    () =>
      notes
        .filter(({ category }) => (!categoryFilter ? true : category === categoryFilter))
        .filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter))
        .map(({ _id, category, title, content, date }) => (
          <Note key={_id} _id={_id} category={category} title={title} content={content} date={date} />
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
              {[...notes]
                .sort((a, b) => a.category.localeCompare(b.category))
                .filter(
                  ({ category }, ind, notes) => category && category !== (notes[ind + 1] && notes[ind + 1].category),
                )
                .map(({ category, _id }) => (
                  <option key={_id}>{category}</option>
                ))}
            </CategoryFilter>

            <SearchFilter>
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

export default Notes
