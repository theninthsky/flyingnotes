import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocketConnection'
import { themeState, userState, loadingNotesState } from 'atoms'
import { notesSelector } from 'selectors'
import { exampleNote } from './constants'
import NewNote from 'components/NewNote'
import Note from 'components/Note'
import { Loader } from 'components/UI'
import { Filters, CategoryFilter, SearchFilter, SearchBox, NotesWrap } from './style'

const Notes = () => {
  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const [loading, setLoading] = useRecoilState(loadingNotesState)

  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const getNotes = async () => {
      if (user.name) {
        const { notes } = await ws.json({ type: 'getNotes' })

        setNotes(notes)
        return setLoading(false)
      }

      const notes = JSON.parse(localStorage.notes || `[${JSON.stringify(exampleNote)}]`)

      setNotes(notes)
      setLoading(false)
    }

    if (!notes.length) setTimeout(getNotes, 1000)
  }, [notes.length, setLoading, setNotes, user.name])

  const filteredNotes = useMemo(
    () =>
      notes
        .filter(({ category }) => (!categoryFilter ? true : category === categoryFilter))
        .filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter))
        .map(({ _id, category, title, content, date }) => (
          <Note
            key={_id}
            _id={_id}
            category={category}
            title={title}
            content={content}
            date={date}
            modifyNote={modifiedNote =>
              setNotes(notes.map(note => (note._id === modifiedNote._id ? modifiedNote : note)))
            }
          />
        )),
    [notes, setNotes, categoryFilter, searchFilter],
  )

  if (loading) return <Loader />

  return (
    <>
      <Filters>
        <CategoryFilter theme={theme} title="Category" onChange={event => setCategoryFilter(event.target.value)}>
          <option defaultValue value="">
            ALL
          </option>
          {[...notes]
            .sort((a, b) => a.category.localeCompare(b.category))
            .filter(({ category }, ind, notes) => category && category !== (notes[ind + 1] && notes[ind + 1].category))
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
        <NewNote addNote={newNote => setNotes([...notes, newNote])} />
        {filteredNotes}
      </NotesWrap>
    </>
  )
}

export default Notes
