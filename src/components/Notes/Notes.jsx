import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ws } from 'websocket-connection'
import { userState, notesState } from 'atoms'
import { categoriesSelector } from 'selectors'
import { RENDER_BATCH } from './constants'
import { useGetNotes } from 'hooks'
import { Filters, Note, LazyRender } from 'components'
import { NotesWrap } from './style'

const Notes = () => {
  const notes = useGetNotes()

  const user = useRecoilValue(userState)
  const categories = useRecoilValue(categoriesSelector)
  const setNotes = useSetRecoilState(notesState)

  const [filteredNotes, setFilteredNotes] = useState(notes)
  const [renderedNotes, setRenderedNotes] = useState(filteredNotes.slice(0, RENDER_BATCH))

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

  const createNote = async note => {
    let savedNote

    if (user.name) {
      savedNote = (await ws.json({ type: 'createNote', newNote: note })).newNote

      if (!savedNote) return

      localStorage.setItem('userNotes', JSON.stringify([...notes, savedNote]))
    } else {
      savedNote = { ...note, _id: Date.now().toString(), date: new Date().toISOString() }
      localStorage.setItem('notes', JSON.stringify([...notes, savedNote]))
    }

    setNotes([...notes, savedNote])
  }

  const updatePin = async (noteID, pinned) => {
    if (user.name) {
      const { status } = await ws.json({ type: 'updateNotePin', noteID, pinned: !pinned })

      if (status !== 'SUCCESS') return

      localStorage.setItem(
        'userNotes',
        JSON.stringify(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
      )
    } else {
      localStorage.setItem(
        'notes',
        JSON.stringify(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
      )
    }

    setNotes(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
  }

  const updateNote = async note => {
    let updatedNote

    if (user.name) {
      updatedNote = (await ws.json({ type: 'updateNote', updatedNote: note })).updatedNote
      localStorage.setItem(
        'userNotes',
        JSON.stringify(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
      )
    } else {
      updatedNote = { ...note, date: new Date() }
      localStorage.setItem(
        'notes',
        JSON.stringify(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)))
      )
    }

    setNotes(
      notes.map(originalNote =>
        originalNote._id === note._id ? { ...note, date: new Date().toISOString() } : originalNote
      )
    )
  }

  const deleteNote = async noteID => {
    if (user.name) {
      const { status } = await ws.json({ type: 'deleteNote', noteID })

      if (status !== 'SUCCESS') return

      localStorage.setItem('userNotes', JSON.stringify(notes.filter(({ _id }) => _id !== noteID)))
    } else {
      localStorage.setItem('notes', JSON.stringify(notes.filter(({ _id }) => _id !== noteID)))
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

      <NotesWrap>
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
      </NotesWrap>
    </>
  )
}

export default Notes
