import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userState } from 'atoms'
import { notesSelector, categoriesSelector } from 'selectors'
import Note from 'components/Note'
import { Filters, CategoryFilter, SearchFilter, SearchBox, NotesWrap } from './style'

const Notes = () => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)

  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const getNotes = async () => {
      if (!ws) await createWebSocketConnection()

      const { notes } = await ws.json({ type: 'getNotes' })

      setNotes(notes)
      localStorage.userNotes = JSON.stringify(notes)
    }

    if (user.name) getNotes()
  }, [user.name, setNotes])

  const filteredNotes = useMemo(
    () =>
      notes
        .filter(({ category }) => (!categoryFilter ? true : category === categoryFilter))
        .filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter))
        .map(({ _id, category, title, content, date }) => (
          <Note key={_id} _id={_id} category={category} title={title} content={content} date={date} />
        )),
    [notes.length, categoryFilter, searchFilter] // eslint-disable-line
  )

  return (
    <>
      <Filters>
        <CategoryFilter title="Category" onChange={event => setCategoryFilter(event.target.value)}>
          <option defaultValue value="">
            ALL
          </option>
          {categories.map(category => (
            <option key={category}>{category}</option>
          ))}
        </CategoryFilter>

        <SearchFilter>
          <SearchBox
            type="search"
            value={searchFilter}
            placeholder="Search..."
            aria-label="search"
            onChange={event => setSearchFilter(event.target.value.toLowerCase())}
          />
        </SearchFilter>
      </Filters>

      <NotesWrap>
        <Note newNote />
        {filteredNotes}
      </NotesWrap>
    </>
  )
}

export default Notes
