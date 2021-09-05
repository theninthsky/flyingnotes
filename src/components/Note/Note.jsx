import { useState, useEffect, useRef } from 'react'
import { bool, string, func, shape, arrayOf, oneOf } from 'prop-types'
import useClickOutside from 'use-click-outside'
import TextareaAutosize from 'react-textarea-autosize'
import cx from 'clsx'

import { CATEGORY, TITLE, SAVE, DELETE_MESSAGE } from './constants'
import If from 'components/If'
import Content from './Content'
import Options from 'components/Options'

import style from './Note.scss'
import PinIcon from 'images/pin.svg'

const [NOTE, LIST] = ['note', 'list']
const emptyItem = { value: '', checked: false }
const defaultItems = [emptyItem]

const Note = ({
  variant,
  empty,
  _id,
  pinned = false,
  category: propsCategory = '',
  title: propsTitle = '',
  content: propsContent = '',
  items: propsItems = defaultItems,
  date,
  onCreate,
  onUpdatePin,
  onUpdate,
  onCheckItem,
  onDelete
}) => {
  const [category, setCategory] = useState(propsCategory)
  const [title, setTitle] = useState(propsTitle)
  const [content, setContent] = useState(propsContent)
  const [items, setItems] = useState(propsItems)
  const [editMode, setEditMode] = useState(false)
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [confirmMessageVisible, setConfirmMessageVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const noteRef = useRef()

  useEffect(() => {
    setCategory(propsCategory)
    setTitle(propsTitle)
    setContent(propsContent)
    setItems(propsItems)
  }, [propsCategory, propsTitle, propsContent, propsItems])

  useClickOutside(noteRef, () => {
    // setExpanded(false)
    setOptionsVisible(false)
    setConfirmMessageVisible(false)
    setEditMode(false)
  })

  const reset = () => {
    setCategory('')
    setTitle('')
    setContent('')
    setItems([emptyItem])
  }

  const updatePin = async event => {
    event.stopPropagation()

    onUpdatePin(_id, pinned)
  }

  const saveNote = async event => {
    event.preventDefault()

    const note = {
      pinned,
      category: variant === NOTE ? category.trim() : undefined,
      title: title.trim(),
      content: content.trim(),
      items: variant === LIST ? items.map(item => ({ ...item, value: item.value.trim() })) : undefined
    }

    setLoading(true)

    if (empty) {
      await onCreate(note)
      reset()
    } else {
      note._id = _id

      await onUpdate(note)
    }

    setEditMode(false)
    setOptionsVisible(false)
    setLoading(false)
  }

  const deleteNote = async () => {
    setLoading(true)
    onDelete(_id)
  }

  const originalItems = [...propsItems]
    .sort((a, b) => a.value.localeCompare(b.value))
    .map(({ value }) => value)
    .toString()
  const currentItems = [...items]
    .sort((a, b) => a.value.localeCompare(b.value))
    .map(({ value }) => value)
    .toString()

  const changed =
    category !== propsCategory || title !== propsTitle || content !== propsContent || originalItems !== currentItems

  return (
    <form
      className={cx(style.wrapper, { [style.disabled]: loading })}
      ref={noteRef}
      autoComplete="off"
      onClick={() => {
        if (!empty) setOptionsVisible(true)
        setEditMode(true)
      }}
      onKeyPress={event => {
        if (variant === LIST && event.key === 'Enter') event.preventDefault()
      }}
      onSubmit={saveNote}
    >
      <If condition={!empty}>
        <PinIcon className={cx(style.pinIcon, { [style.pinned]: pinned })} onClick={updatePin} />
      </If>

      <If condition={variant === NOTE && (empty || category || editMode)}>
        <input
          className={style.category}
          value={category}
          dir="auto"
          placeholder={CATEGORY}
          aria-label="category"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))}
        />
      </If>

      <If condition={empty || title || editMode}>
        <TextareaAutosize
          className={style.title}
          value={title}
          dir="auto"
          placeholder={TITLE}
          aria-label="title"
          onKeyPress={event => {
            if (event.key === 'Enter') event.preventDefault()
          }}
          onChange={event => setTitle(event.target.value)}
        />
      </If>

      <Content
        id={_id}
        variant={variant}
        empty={empty}
        changed={changed}
        content={content}
        items={items}
        setContent={setContent}
        setItems={setItems}
        onCheckItem={onCheckItem}
      />

      <If condition={optionsVisible}>
        <Options onDelete={deleteNote} setConfirmMessage={setConfirmMessageVisible} />
      </If>

      {confirmMessageVisible ? (
        <div className={style.confirmMessage}>{DELETE_MESSAGE}</div>
      ) : changed || empty ? (
        <input
          className={cx(style.save, { [style.hidden]: !changed && !empty })}
          type="submit"
          value={SAVE}
          aria-label="save"
        />
      ) : (
        <If condition={!empty}>
          <div className={style.date}>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</div>
        </If>
      )}
    </form>
  )
}

Note.propTypes = {
  variant: oneOf([NOTE, LIST]).isRequired,
  empty: bool,
  _id: string,
  pinned: bool,
  category: string,
  title: string,
  content: string,
  items: arrayOf(shape({ checked: bool, value: string })),
  date: string,
  onCreate: func,
  onUpdatePin: func,
  onUpdate: func,
  onCheckItem: func,
  onDelete: func
}

export default Note
