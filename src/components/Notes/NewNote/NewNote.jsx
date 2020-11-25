import { useState, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useRecoilValue } from 'recoil'

import { ws } from '../../../websocketConnection'
import { themeState, userState } from '../../../atoms'
import { Wrapper, Category, Title, Content, Save } from './style'

const NewNote = props => {
  const { updateMode, toggleEditMode, closeOptions, addNote, modifyNote } = props

  const { addingNote, updatingNote } = useSelector(
    ({ app: { addingNote, updatingNote } }) => ({ addingNote, updatingNote }),
    shallowEqual,
  )

  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)

  const [category, setCategory] = useState(props.category || '')
  const [title, setTitle] = useState(props.title || '')
  const [content, setContent] = useState(props.content || '')

  useEffect(() => {
    if (updateMode || addingNote) return

    setCategory('')
    setTitle('')
    setContent('')
  }, [updateMode, addingNote])

  const createNote = async newNote => {
    if (user.name) {
      // dispatch({ type: ADDING_NOTE, status: true })

      const { newNote: note } = await ws.json({ type: 'createNote', newNote })

      return addNote(note)
    }

    newNote = { ...newNote, _id: Date.now(), date: Date.now() }
    localStorage.setItem(
      'notes',
      JSON.stringify(localStorage.notes ? [...JSON.parse(localStorage.notes), newNote] : [newNote]),
    )

    addNote(newNote)
  }

  const updateNote = async updatedNote => {
    if (user.name) {
      // dispatch({ type: UPDATING_NOTE, noteID: updatedNote._id })

      const { updatedNote: note } = await ws.json({ type: 'updateNote', updatedNote })

      return modifyNote(note)
    }

    updatedNote.date = Date.now()
    localStorage.setItem(
      'notes',
      JSON.stringify(JSON.parse(localStorage.notes).map(note => (note._id === updatedNote._id ? updatedNote : note))),
    )

    modifyNote(updatedNote)
  }

  const saveNoteLocallyHandler = event => {
    event.preventDefault()

    const note = {
      _id: props._id,
      category: category.trim(),
      title: title.trim(),
      content,
    }

    if (!updateMode) return createNote(note)

    updateNote(note)
    toggleEditMode()
    closeOptions()
  }

  const saveNoteOnCloudHandler = event => {
    event.preventDefault()

    if (!updateMode) return createNote({ category, title, content })

    updateNote({ _id: props._id, category, title, content })
    toggleEditMode()
    closeOptions()
  }

  return (
    <Wrapper saving={addingNote || updatingNote}>
      <form onSubmit={user.name ? saveNoteOnCloudHandler : saveNoteLocallyHandler} autoComplete="off">
        <Category
          type="text"
          value={category}
          dir="auto"
          placeholder="CATEGORY"
          maxLength="24"
          title="Optional"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))} // forces maxLength on mobile devices
        />

        <Title
          theme={theme}
          type="text"
          dir="auto"
          placeholder="Title"
          value={title}
          title="Optional"
          maxLength="60"
          onChange={event => setTitle(event.target.value)}
        />

        <Content
          dir={/^[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(content) ? 'rtl' : 'ltr'}
          value={content}
          title="Note's content"
          required
          onChange={event => setContent(event.target.value)}
        ></Content>

        <Save type="submit" value="SAVE" />
      </form>
    </Wrapper>
  )
}

export default NewNote
