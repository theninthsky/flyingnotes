import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LazyRender, useAxios, useViewport } from 'frontend-essentials'

import { userLoggedInSelector } from 'containers/App/selectors'
import { notesSelector, categoriesSelector } from './selectors'
import Filters from 'components/Filters'
import Note from 'components/Note'

import style from './Notes.scss'

const Notes = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [notes, setNotes] = useRecoilState(notesSelector)
  const categories = useRecoilValue(categoriesSelector)

  const [filteredNotes, setFilteredNotes] = useState(notes)

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  const { activate: getNotes } = useAxios({
    url: '/notes',
    method: 'get',
    manual: true,
    onSuccess: ({ data }) => setNotes(data)
  })
  const { activate: createNote } = useAxios({
    url: '/notes',
    method: 'post',
    manual: true,
    onSuccess: ({ data }) => setNotes(notes => [...notes, data])
  })
  const { activate: updatePin } = useAxios({
    url: '/note',
    method: 'patch',
    manual: true,
    onError: () => setNotes(notes)
  })
  const { activate: updateNote } = useAxios({
    url: '/note',
    method: 'put',
    manual: true,
    onSuccess: ({ data }) => setNotes(notes.map(note => (note._id === data._id ? data : note)))
  })

  useEffect(() => {
    if (userLoggedIn) getNotes()
  }, [userLoggedIn])

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

  const onCreateNote = note => {
    if (userLoggedIn) return createNote({ data: note })

    const localNote = { ...note, _id: Date.now().toString(), date: new Date().toISOString() }

    setNotes([...notes, localNote])
  }

  const onUpdatePin = (noteID, pinned) => {
    if (userLoggedIn) updatePin({ data: { noteID, pinned: !pinned } })

    setNotes(notes.map(note => (note._id === noteID ? { ...note, pinned: !pinned } : note)))
  }

  const onUpdateNote = note => {
    if (userLoggedIn) return updateNote({ data: note })

    const updatedLocalNote = { ...note, date: new Date().toString() }

    setNotes(notes.map(note => (note._id === updatedLocalNote._id ? updatedLocalNote : note)))
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
        <Note variant="note" empty onCreate={onCreateNote} />

        <LazyRender items={filteredNotes} batch={viewport12 ? 20 : 8} rootMargin="100%">
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
              onUpdatePin={onUpdatePin}
              onUpdate={onUpdateNote}
              onDelete={noteID => setNotes(notes.filter(({ _id }) => _id !== noteID))}
            />
          )}
        </LazyRender>
      </div>
    </>
  )
}

export default Notes
