import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { createNote, updateNote } from '../../../store/actions/index'

// #region Styles
const Wrapper = styled.div`
  position: relative;
  margin: 15px;
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  animation: showNewNote 0.5s;
  opacity: ${({ saving }) => (saving ? '0.5' : '1')};
  pointer-events: ${({ saving }) => (saving ? 'none' : 'auto')};

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @keyframes showNewNote {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 200px;
    margin: 10px 0;
  }
`
const Category = styled.input`
  display: block;
  width: 100%;
  padding: 2px 0;
  border: none;
  border-radius: 4px 4px 0 0;
  outline: none;
  font-family: inherit;
  text-align: center;
  font-size: 12px;
  letter-spacing: 3px;
  color: rgb(150, 150, 150);
  background-color: #ffffde;

  &::placeholder {
    color: rgb(190, 190, 190);
  }
`
const Title = styled.input`
  display: block;
  width: 100%;
  margin: 6px auto;
  margin-bottom: 0;
  padding: 0 5%;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-family: inherit;
  background-color: inherit;
  text-align: center;
  color: inherit;
  font-size: 24px;

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? 'rgb(200, 200, 200)' : 'auto')};
  }
`
const Content = styled.textarea`
  display: block;
  width: 90%;
  margin: 4px 12px 2.5px 12px;
  padding-bottom: 12.5vh;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  color: inherit;
  background-color: inherit;
  resize: none;
  white-space: pre;
  overflow: auto;

  &::-webkit-scrollbar-thumb {
    visibility: hidden;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }

  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: #999;
    }
  }
`
const Save = styled.input`
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  text-align: center;
  border-radius: 0 0 4px 4px;
  color: white;
  font-size: 14px;
  background-color: green;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: rgb(44, 179, 44);
  }
`
// #endregion

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = { createNote, updateNote }

const NewNote = props => {
  const {
    updateMode,
    toggleEditMode,
    closeOptions,
    app: { theme, addingNote, updatingNote },
    createNote,
    updateNote,
  } = props

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
      <form onSubmit={props.user.name ? saveNoteOnCloudHandler : saveNoteLocallyHandler} autoComplete="off">
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

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
