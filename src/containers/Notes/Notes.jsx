import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import { LazyRender, useAxios, useViewport } from 'frontend-essentials'

import { db } from 'firebase-app'
import { userState } from 'containers/App/atoms'
import { notesSelector, categoriesSelector } from './selectors'
import Filters from 'components/Filters'
import Note, { TYPE_NOTE } from 'components/Note'

import style from './Notes.scss'

const Notes = () => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)

  const [notesCollection, setNotesCollection] = useState()
  const [filteredNotes, setFilteredNotes] = useState(notes)
  const [loadingNoteID, setLoadingNoteID] = useState()

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  const { loading: creatingNote, activate: createNote } = useAxios({ url: '/notes', method: 'post', manual: true })
  const { activate: updatePin } = useAxios({ url: '/note', method: 'patch', manual: true })
  const { activate: updateNote } = useAxios({
    url: '/note',
    method: 'put',
    manual: true,
    onSuccess: ({ data }) => {
      setLoadingNoteID()
      setNotes(notes.map(note => (note._id === data._id ? data : note)))
    }
  })
  const { activate: deleteNote } = useAxios({ url: '/note', method: 'delete', manual: true })

  useEffect(() => {
    setNotesCollection(user ? collection(db, `users/${user.uid}/notes`) : undefined)
  }, [user])

  useEffect(() => {
    const getNotes = async () => {
      const notesSnapshot = await getDocs(notesCollection)

      notesSnapshot.docs.map(doc => console.log(doc.data()))
    }

    if (notesCollection) getNotes()
  }, [notesCollection])

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

  const onCreateNote = async (note, reset) => {
    console.log(note)

    if (notesCollection) {
      await addDoc(notesCollection, note)
      return reset()
    }

    const localNote = { ...note, _id: Date.now().toString(), date: new Date().toISOString() }

    setNotes([...notes, localNote])
  }

  const onUpdatePin = (noteID, pinned) => {
    if (!user) return setNotes(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))

    updatePin({
      data: { noteID, pinned: !pinned },
      onSuccess: () => setNotes(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
    })
  }

  const onUpdateNote = note => {
    if (user) {
      setLoadingNoteID(note._id)
      return updateNote({ data: note })
    }

    const updatedLocalNote = { ...note, date: new Date().toString() }

    setNotes(notes.map(note => (note._id === updatedLocalNote._id ? updatedLocalNote : note)))
  }

  const onDeleteNote = noteID => {
    if (!user) return setNotes(notes.filter(({ _id }) => _id !== noteID))

    setLoadingNoteID(noteID)
    deleteNote({
      data: { noteID },
      onSuccess: () => {
        setNotes(notes.filter(({ _id }) => _id !== noteID))
        setLoadingNoteID()
      }
    })
  }

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
        <Note variant={TYPE_NOTE} empty loading={creatingNote} onCreate={onCreateNote} />

        <LazyRender items={filteredNotes} batch={viewport12 ? 20 : 8} rootMargin="100%">
          {({ _id, pinned, category, title, content, date }) => (
            <Note
              key={_id}
              variant={TYPE_NOTE}
              _id={_id}
              pinned={pinned}
              category={category}
              title={title}
              content={content}
              date={date}
              loading={_id === loadingNoteID}
              onUpdatePin={onUpdatePin}
              onUpdate={onUpdateNote}
              onDelete={onDeleteNote}
            />
          )}
        </LazyRender>
      </div>
    </>
  )
}

export default Notes
