import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { themeState, userState, loadingNotesState } from 'atoms'
import { notesSelector, categoriesSelector } from 'selectors'
import { exampleNote } from './constants'
import NewNote from 'components/NewNote'
import Note from 'components/Note'
import { Loader } from 'components/UI'
import { Filters, CategoryFilter, SearchFilter, SearchBox, NotesWrap } from './style'

const Notes = () => {
  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)
  const [loading, setLoading] = useRecoilState(loadingNotesState)

  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const getNotes = async () => {
      let notes

      if (user.name) {
        if (!ws) await createWebSocketConnection()

        notes = (await ws.json({ type: 'getNotes' })).notes
        setNotes(notes)
      } else {
        notes = JSON.parse(localStorage.notes || `[${JSON.stringify(exampleNote)}]`)
      }

      setNotes(notes)
      setLoading(false)
    }

    if (!notes.length) getNotes()
  }, [notes.length, setLoading, setNotes, user.name])

  const filteredNotes = useMemo(
    () =>
      notes
        .filter(({ category }) => (!categoryFilter ? true : category === categoryFilter))
        .filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter))
        .map(({ _id, category, title, content, date }) => (
          <Note key={_id} _id={_id} category={category} title={title} content={content} date={date} />
        )),
    [notes, categoryFilter, searchFilter]
  )

  if (loading) return <Loader />

  return (
    <>
      <Filters>
        <CategoryFilter theme={theme} title="Category" onChange={event => setCategoryFilter(event.target.value)}>
          <option defaultValue value="">
            ALL
          </option>
          {categories.map(category => (
            <option key={category}>{category}</option>
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
  )
}

export default Notes
