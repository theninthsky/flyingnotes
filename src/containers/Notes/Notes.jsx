import { useState, useMemo, useEffect } from 'react'
import { addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { LazyRender, useViewport } from 'frontend-essentials'

import Filters from 'components/Filters'
import Note, { TYPE_NOTE } from 'components/Note'

import style from './Notes.scss'

const Notes = ({ collectionRef, notes }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes)

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

  const onCreateNote = (note, reset) => {
    addDoc(collectionRef, note)
    reset()
  }

  const categories = useMemo(
    () =>
      [...new Set(notes)]
        .map(({ category }) => category)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [notes]
  )

  return (
    <>
      <Filters
        categories={categories}
        onSelect={categoryFilter =>
          setFilteredNotes(notes.filter(({ category }) => (!categoryFilter ? true : category === categoryFilter)))
        }
        onSearch={(categoryFilter, searchTerm) =>
          setFilteredNotes(
            notes.filter(
              ({ category, title, content }) =>
                (!categoryFilter ? true : category === categoryFilter) &&
                `${title} ${content}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        }
      />

      <div className={style.wrapper}>
        <Note variant={TYPE_NOTE} empty onCreate={onCreateNote} />

        <LazyRender items={filteredNotes} batch={viewport12 ? 20 : 8} rootMargin="100%">
          {({ documentRef, id, pinned, category, title, content, date }) => (
            <Note
              key={id}
              variant={TYPE_NOTE}
              pinned={pinned}
              category={category}
              title={title}
              content={content}
              date={date}
              onUpdate={note => updateDoc(documentRef, note)}
              onDelete={deleteDoc}
            />
          )}
        </LazyRender>
      </div>
    </>
  )
}

export default Notes
