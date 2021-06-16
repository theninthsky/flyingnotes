import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { userLoggedInSelector, notesSelector, categoriesSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { useGetNotes } from 'hooks'
import Filters from 'components/Filters'
import Note from 'components/Note'
import LazyRender from 'components/LazyRender'

import style from './Notes.scss'

const Notes = () => {
  const notes = useGetNotes()

  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const setNotes = useSetRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)

  const [filteredNotes, setFilteredNotes] = useState(notes)
  const [renderedNotes, setRenderedNotes] = useState(filteredNotes.slice(0, RENDER_BATCH))

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

  const createNote = async note => {
    const savedNote = userLoggedIn
      ? (await ws.json({ type: 'createNote', newNote: note })).newNote
      : { ...note, _id: Date.now().toString(), date: new Date().toISOString() }

    if (!savedNote) return

    setNotes([...notes, savedNote])
  }

  const updatePin = async (noteID, pinned) => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'updateNotePin', noteID, pinned: !pinned })

      if (status !== 'SUCCESS') return
    }

    setNotes(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
  }

  const updateNote = async note => {
    const updatedNote = userLoggedIn
      ? (await ws.json({ type: 'updateNote', updatedNote: note })).updatedNote
      : { ...note, date: new Date() }

    if (!updateNote) return

    setNotes(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
  }

  const deleteNote = async noteID => {
    if (userLoggedIn) {
      const { status } = await ws.json({ type: 'deleteNote', noteID })

      if (status !== 'SUCCESS') return
    }

    setNotes(notes.filter(({ _id }) => _id !== noteID))
  }

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

      <div className={style.wrapper}>
        <Note newNote onCreateNote={createNote} />

        {renderedNotes.map(({ _id, pinned, category, title, content, date }) => (
          <Note
            key={_id}
            _id={_id}
            pinned={pinned}
            category={category}
            title={title}
            content={content}
            date={date}
            onUpdatePin={updatePin}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
          />
        ))}

        <LazyRender batch={RENDER_BATCH} items={filteredNotes} setItems={setRenderedNotes} />
      </div>
    </>
  )
}

export default Notes
