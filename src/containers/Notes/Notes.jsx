import { useState, useMemo, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { collection, query, orderBy, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { LazyRender, useViewport } from 'frontend-essentials'

import { db } from 'firebase-app'
import { userState } from 'containers/App/atoms'
import Filters from 'components/Filters'
import Note, { TYPE_NOTE } from 'components/Note'

import style from './Notes.scss'

const Notes = () => {
  const user = useRecoilValue(userState)

  const [collectionRef, setCollectionRef] = useState()
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState(notes)

  const { viewport12 } = useViewport({ viewport12: '(min-width: 1200px)' })

  useEffect(() => {
    setCollectionRef(user ? collection(db, `users/${user.uid}/notes`) : undefined)
  }, [user])

  useEffect(() => {
    if (!collectionRef) return setNotes([])

    const unsubscribe = onSnapshot(
      query(collectionRef, orderBy('pinned', 'desc'), orderBy('date', 'desc')),
      snapshot => {
        setNotes(snapshot.docs.map(doc => ({ documentRef: doc.ref, id: doc.id, ...doc.data() })))
      }
    )

    return unsubscribe
  }, [collectionRef])

  useEffect(() => {
    setFilteredNotes(notes)
  }, [notes])

  const onCreateNote = async (note, reset) => {
    if (!collectionRef) return

    addDoc(collectionRef, note)
    reset()
  }

  const onUpdateNote = (note, documentRef) => {
    if (documentRef) updateDoc(documentRef, note)
  }

  const onDeleteNote = documentRef => {
    if (collectionRef) deleteDoc(documentRef)
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
              onUpdate={note => onUpdateNote(note, documentRef)}
              onDelete={() => onDeleteNote(documentRef)}
            />
          )}
        </LazyRender>
      </div>
    </>
  )
}

export default Notes
