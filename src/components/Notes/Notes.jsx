import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userState } from 'atoms'
import { notesSelector, categoriesSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { Note, LazyRender } from 'components'
import { Filters, CategoryFilter, SearchFilter, SearchBox, NotesWrap } from './style'

const Notes = () => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)

  const [renderedNotes, setRenderedNotes] = useState([])
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
        .filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter)),
    [notes, categoryFilter, searchFilter]
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

        {renderedNotes.map(({ _id, pinned, category, title, content, date }) => (
          <Note key={_id} _id={_id} pinned={pinned} category={category} title={title} content={content} date={date} />
        ))}

        <LazyRender batch={RENDER_BATCH} items={filteredNotes} setItems={setRenderedNotes} />
      </NotesWrap>
    </>
  )
}

export default Notes
