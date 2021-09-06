import { useState, useRef, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { userLoggedInSelector } from 'containers/App/selectors'
import { notesSelector, categoriesSelector } from './selectors'
import { RENDER_BATCH } from './constants'
import useGetNotes from 'hooks/useGetNotes'
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

  const targetRef = useRef()

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
    const { updatedNote } = userLoggedIn
      ? await ws.json({ type: 'updateNote', updatedNote: note })
      : { updatedNote: { ...note, date: new Date().toString() } }

    if (!updatedNote) return

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
        <Note variant="note" empty onCreate={createNote} />

        <LazyRender items={filteredNotes} batch={RENDER_BATCH} targetRef={targetRef}>
          {({ _id, pinned, category, title, content, date }) => (
            <Note
              key={_id}
              variant="note"
              _id={_id}
              pinned={pinned}
              category={category}
              title={title}
              content={content}
              date={date}
              onUpdatePin={updatePin}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          )}
        </LazyRender>

        <div ref={targetRef}></div>
      </div>
    </>
  )
}

export default Notes
