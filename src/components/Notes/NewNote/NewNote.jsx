import { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRecoilValue } from 'recoil'

import { createNote, updateNote } from '../../../store/actions/index'
import { themeState } from '../../App/atoms'
import { userState } from '../../User/atoms'
import { Wrapper, Category, Title, Content, Save } from './style'

const NewNote = props => {
  const { updateMode, toggleEditMode, closeOptions } = props

  const dispatch = useDispatch()
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

  const saveNoteLocallyHandler = event => {
    event.preventDefault()

    const note = {
      _id: props._id,
      category: category.trim(),
      title: title.trim(),
      content,
    }

    if (!updateMode) return dispatch(createNote(note))

    dispatch(updateNote(note))
    toggleEditMode()
    closeOptions()
  }

  const saveNoteOnCloudHandler = event => {
    event.preventDefault()

    if (!updateMode) return dispatch(createNote({ category, title, content }))

    dispatch(updateNote({ _id: props._id, category, title, content }))
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
