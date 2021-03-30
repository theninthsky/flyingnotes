import { useState, useEffect, useRef } from 'react'
import { bool, string, func, arrayOf, shape } from 'prop-types'

import { RTL_REGEX, EMPTY_IMAGE } from 'global-constants'
import { TITLE, SAVE, DELETE_MESSAGE } from './constants'
import { If, Options } from 'components'
import { Wrapper, Pin, Title, Content, Checked, Value, ConfirmMessage, StyledDate, Save } from './style'

const emptyItem = { value: '', checked: false }

const List = ({
  newList,
  _id: listID,
  pinned = false,
  title: listTitle = '',
  items: listItems,
  date,
  onCreateList,
  onUpdatePin,
  onCheckItem,
  onUpdateList,
  onDeleteList
}) => {
  const [title, setTitle] = useState(listTitle)
  const [items, setItems] = useState(listItems)
  const [editMode, setEditMode] = useState(false)
  const [optionsAreVisible, setOptionsAreVisible] = useState(false)
  const [confirmMessageIsVisible, setConfirmMessageIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingItem, setCheckingItem] = useState(false)

  const contentRef = useRef()

  useEffect(() => {
    setTitle(listTitle)
    setItems(listItems)
  }, [listTitle, listItems])

  const resetList = () => {
    setTitle('')
    setItems([emptyItem])
  }

  const handleEnterPress = (event, index) => {
    if (event.key === 'Enter' && event.target.value) {
      setItems(prevItems => [...prevItems.slice(0, index + 1), emptyItem, ...prevItems.slice(index + 1)])

      const items = contentRef.current.childNodes
      const nextIndex = [...items].findIndex(item => item.childNodes[1] === event.target) + 1

      setTimeout(() => items[nextIndex].childNodes[1].focus())
    }
  }

  const handleBackspacePress = (event, index) => {
    if ((event.key === 'Backspace' || event.key === 'Delete') && items.length > 1 && !items[index].value) {
      event.preventDefault()

      setItems(prevItems => prevItems.filter((_, ind) => ind !== index))

      const items = contentRef.current.childNodes
      const prevIndex = [...items].findIndex(item => item.childNodes[1] === event.target) - 1

      setTimeout(() => items[prevIndex > 0 ? prevIndex : 0].childNodes[1].focus())
    }
  }

  const saveList = async event => {
    event.preventDefault()

    const list = {
      pinned,
      title: title.trim(),
      items: items.map(item => ({ ...item, value: item.value.trim() }))
    }

    setLoading(true)

    if (newList) {
      await onCreateList(list)
      resetList()
    } else {
      list._id = listID

      await onUpdateList(list)
    }

    setEditMode(false)
    setOptionsAreVisible(false)
    setLoading(false)
  }

  const updatePin = async event => {
    event.stopPropagation()

    onUpdatePin(listID, pinned)
  }

  const checkItem = async (event, index) => {
    event.stopPropagation()

    const item = items[index]

    if (!item.value || checkingItem) return

    setCheckingItem(true)

    const otherItems = items.filter((_, ind) => ind !== index)
    const updatedItems = item.checked
      ? [{ ...item, checked: false }, ...otherItems]
      : [...otherItems, { ...item, checked: true }]

    await onCheckItem(listID, index, item, updatedItems)
    setItems(updatedItems)
    setCheckingItem(false)
  }

  const deleteList = async () => {
    setLoading(true)
    onDeleteList(listID)
  }

  const originalItems = [...listItems]
    .sort((a, b) => a.value.localeCompare(b.value))
    .map(({ value }) => value)
    .toString()
  const currentItems = [...items]
    .sort((a, b) => a.value.localeCompare(b.value))
    .map(({ value }) => value)
    .toString()
  const listChanged = title !== listTitle || originalItems !== currentItems

  return (
    <Wrapper
      faded={loading}
      autoComplete="off"
      onClick={() => {
        if (!newList) setOptionsAreVisible(true)
      }}
      onMouseLeave={() => {
        setOptionsAreVisible(confirmMessageIsVisible)
        setEditMode(false)
      }}
      onKeyPress={event => {
        if (event.key === 'Enter') event.preventDefault()
      }}
      onSubmit={saveList}
    >
      <If condition={!newList}>
        <Pin pinned={pinned} src={EMPTY_IMAGE} onClick={updatePin} />
      </If>

      <If condition={title || newList || editMode}>
        <Title
          value={title}
          dir="auto"
          placeholder={TITLE}
          aria-label="title"
          onClick={() => setEditMode(true)}
          onChange={event => setTitle(event.target.value)}
        />
      </If>

      <Content
        as="div"
        clipped={pinned && !title}
        ref={contentRef}
        aria-label="content"
        onClick={() => {
          if (items.every(({ checked }) => checked)) {
            setItems([emptyItem, ...items])
            setTimeout(() => contentRef.current.childNodes[0].childNodes[1].focus())
          }
        }}
      >
        {[...items]
          .sort((a, b) => a.checked - b.checked)
          .map(({ value, checked }, ind) => (
            <div style={{ display: 'flex' }} key={ind}>
              <Checked checked={checked} src={EMPTY_IMAGE} onClick={event => checkItem(event, ind)} />

              <Value
                dir={RTL_REGEX.test(value) ? 'rtl' : 'ltr'}
                value={value}
                disabled={checked}
                required
                onClick={() => setEditMode(true)}
                onChange={event =>
                  setItems(prevItems =>
                    prevItems.map((item, index) => (index === ind ? { ...item, value: event.target.value } : item))
                  )
                }
                onKeyDown={event => handleBackspacePress(event, ind)}
                onKeyUp={event => handleEnterPress(event, ind)}
                onBlur={() => {
                  if (!value && items.length > 1) setItems(prevItems => prevItems.filter((_, index) => index !== ind))
                }}
              />
            </div>
          ))}
      </Content>

      <If condition={optionsAreVisible}>
        <Options onDelete={deleteList} toggleConfirmMessage={mode => setConfirmMessageIsVisible(mode)} />
      </If>

      {confirmMessageIsVisible ? (
        <ConfirmMessage>{DELETE_MESSAGE}</ConfirmMessage>
      ) : newList || listChanged ? (
        <Save hidden={!listChanged && !newList} type="submit" value={SAVE} aria-label="save" />
      ) : (
        <If condition={!newList}>
          <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
        </If>
      )}
    </Wrapper>
  )
}

List.propTypes = {
  newList: bool,
  _id: string,
  pinned: bool,
  title: string,
  items: arrayOf(shape({ checked: bool, value: string })),
  date: string,
  onCreateList: func,
  onUpdatePin: func,
  onCheckItem: func,
  onUpdateList: func,
  onDeleteList: func
}

export default List
