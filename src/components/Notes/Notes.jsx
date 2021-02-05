import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { ANIMATION_DURATION } from 'media-queries'
import { userState } from 'atoms'
import { notesSelector, categoriesSelector } from 'selectors'
import { RENDER_LIMIT } from './constants'
import Note from 'components/Note'
import { Filters, CategoryFilter, SearchFilter, SearchBox, NotesWrap } from './style'

const Notes = () => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)

  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [renderLimit, setRenderLimit] = useState(RENDER_LIMIT)

  useEffect(() => {
    const renderLimitTimeout = setTimeout(() => setRenderLimit(Infinity), ANIMATION_DURATION + 50)

    return () => clearTimeout(renderLimitTimeout)
  }, [])

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
        .map(({ _id, pinned, category, title, content, date }) => (
          <Note key={_id} _id={_id} pinned={pinned} category={category} title={title} content={content} date={date} />
        )),
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
        {filteredNotes.slice(0, renderLimit)}
      </NotesWrap>
    </>
  )
}

export default Notes
