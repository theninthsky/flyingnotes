import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { themeState, userState, notesState } from 'atoms'
import { Wrapper, Category, Title, Content, Save } from './style'

const NewNote = () => {
  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesState)

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [adding, setAdding] = useState(false)

  const resetNote = () => {
    setCategory('')
    setTitle('')
    setContent('')
  }

  const createNote = async event => {
    event.preventDefault()

    const note = {
      category: category.trim(),
      title: title.trim(),
      content
    }
    let newNote

    setAdding(true)

    if (user.name) {
      newNote = (await ws.json({ type: 'createNote', newNote: note })).newNote
    } else {
      newNote = { ...note, _id: Date.now(), date: Date.now() }
      localStorage.setItem('notes', JSON.stringify([...notes, newNote]))
    }

    setAdding(false)
    setNotes([...notes, newNote])
    resetNote()
  }

  return (
    <Wrapper saving={adding}>
      <form onSubmit={createNote} autoComplete="off">
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
