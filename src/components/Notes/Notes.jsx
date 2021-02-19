import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userState } from 'atoms'
import { notesSelector, categoriesSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { Filters, Note, LazyRender } from 'components'
import { NotesWrap } from './style'

const Notes = () => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)

  const [filteredNotes, setFilteredNotes] = useState(notes)
  const [renderedNotes, setRenderedNotes] = useState(filteredNotes.slice(0, RENDER_BATCH))

  useEffect(() => {
    const getNotes = async () => {
      if (!ws) await createWebSocketConnection()

      const { notes } = await ws.json({ type: 'getNotes' })

      setNotes(notes)
      localStorage.userNotes = JSON.stringify(notes)
    }

    if (user.name) getNotes()
  }, [user.name, setNotes])

  return (
    <>
      <Filters
        categories={categories}
        onSelect={categoryFilter =>
          setFilteredNotes(notes.filter(({ category }) => (!categoryFilter ? true : category === categoryFilter)))
        }
        onSearch={searchFilter =>
          setFilteredNotes(
            notes.filter(({ title, content }) => `${title} ${content}`.toLowerCase().includes(searchFilter))
          )
        }
      />

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
