import { useState, useEffect, useRef } from 'react'
import { bool, string, func, shape, arrayOf, oneOf } from 'prop-types'
import useClickOutside from 'use-click-outside'
import TextareaAutosize from 'react-textarea-autosize'
import isEqual from 'lodash/isEqual'
import pickBy from 'lodash/pickBy'
import cx from 'clsx'

import { CATEGORY, TITLE, SAVE, DELETE_MESSAGE } from './constants'
import Content from './Content'
import Options from 'components/Options'

import style from './Note.scss'
import PinIcon from 'images/pin.svg'

export const [TYPE_NOTE, TYPE_LIST] = ['note', 'list']
const emptyItem = { value: '', checked: false }
const defaultItems = [emptyItem]

const Note = ({
  variant,
  empty,
  pinned,
  category: propsCategory = '',
  title: propsTitle = '',
  content: propsContent = '',
  items: propsItems = defaultItems,
  date,
  onCreate,
  onUpdate,
  onDelete
}) => {
  const [category, setCategory] = useState(propsCategory)
  const [title, setTitle] = useState(propsTitle)
  const [content, setContent] = useState(propsContent)
  const [items, setItems] = useState(propsItems)
  const [editMode, setEditMode] = useState(false)
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [confirmMessageVisible, setConfirmMessageVisible] = useState(false)

  const ref = useRef()

  useEffect(() => {
    if (empty) return

    setCategory(propsCategory)
    setTitle(propsTitle)
    setContent(propsContent)
    setItems(propsItems)
  }, [propsCategory, propsTitle, propsContent, propsItems])

  useClickOutside(ref, () => {
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

  const onSave = event => {
    event.preventDefault()

    const note = pickBy(
      {
        pinned: empty ? false : pinned,
        category: variant === TYPE_NOTE ? category.trim() : undefined,
        title: title.trim(),
        content: content.trim(),
        items: variant === TYPE_LIST ? items.map(item => ({ ...item, value: item.value.trim() })) : undefined,
        date: new Date().toISOString()
      },
      value => !['', undefined, null].includes(value)
    )

    if (empty) return onCreate(note, reset)

    onUpdate(note)
    setEditMode(false)
    setOptionsVisible(false)
  }

  const changed =
    category !== propsCategory || title !== propsTitle || content !== propsContent || !isEqual(items, propsItems)

  return (
    <form
      className={style.wrapper}
      ref={ref}
      autoComplete="off"
      onClick={() => {
        if (!empty) setOptionsVisible(true)
        setEditMode(true)
      }}
      onKeyPress={event => {
        if (variant === TYPE_LIST && event.key === 'Enter') event.preventDefault()
      }}
      onSubmit={onSave}
    >
      {!empty && (
        <PinIcon
          className={cx(style.pinIcon, { [style.pinned]: pinned })}
          onClick={event => {
            event.stopPropagation()
            onUpdate({ pinned: !pinned })
          }}
        />
      )}

      {variant === TYPE_NOTE && (empty || category || editMode) && (
        <input
          className={style.category}
          value={category}
          dir="auto"
          placeholder={CATEGORY}
          aria-label="category"
          onChange={event => setCategory(event.target.value.toUpperCase().slice(0, 24))}
        />
      )}

      {(empty || title || editMode) && (
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
      )}

      <Content
        variant={variant}
        empty={empty}
        content={content}
        items={items}
        keepExpanded={changed || editMode}
        setContent={setContent}
        setItems={setItems}
        onCheckItem={items => onUpdate({ items })}
      />

      {optionsVisible && <Options setConfirmMessage={setConfirmMessageVisible} onDelete={onDelete} />}

      {confirmMessageVisible ? (
        <div className={style.confirmMessage}>{DELETE_MESSAGE}</div>
      ) : changed || empty ? (
        <input className={style.save} type="submit" value={SAVE} aria-label="save" />
      ) : !empty ? (
        <div className={style.date}>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</div>
      ) : null}
    </form>
  )
}

Note.propTypes = {
  variant: oneOf([TYPE_NOTE, TYPE_LIST]).isRequired,
  empty: bool,
  pinned: bool,
  category: string,
  title: string,
  content: string,
  items: arrayOf(shape({ checked: bool, value: string })),
  date: string,
  onCreate: func,
  onUpdate: func,
  onDelete: func
}

export default Note
