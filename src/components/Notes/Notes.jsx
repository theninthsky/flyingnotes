import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { categoriesSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { useGetNotes } from 'hooks'
import { Filters, Note, LazyRender } from 'components'
import { NotesWrap } from './style'

const Notes = () => {
  const notes = useGetNotes()

  const categories = useRecoilValue(categoriesSelector)

  const [filteredNotes, setFilteredNotes] = useState(notes)
  const [renderedNotes, setRenderedNotes] = useState(filteredNotes.slice(0, RENDER_BATCH))

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

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
