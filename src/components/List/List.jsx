import { useState, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ws } from 'websocket-connection'
import { userState, listsState } from 'atoms'
import { RTL_REGEX } from 'global-constants'
import { TITLE, SAVE, DELETE_MESSAGE } from './constants'
import If from 'components/If'
import Options from 'components/Options'
import { Wrapper, Pin, Title, Content, Item, Checked, Value, ConfirmMessage, StyledDate, Save } from './style'

import checkedIcon from 'images/confirm.svg'
import uncheckedIcon from 'images/cancel.svg'

const emptyItem = { value: '', checked: false }

const List = ({
  newList,
  _id: listID,
  pinned: listIsPinned = false,
  title: listTitle = '',
  items: listItems = [emptyItem],
  date: listDate
}) => {
  const user = useRecoilValue(userState)
  const [lists, setLists] = useRecoilState(listsState)

  const [pinned, setPinned] = useState(listIsPinned)
  const [title, setTitle] = useState(listTitle)
  const [items, setItems] = useState(listItems)
  const [date, setDate] = useState(listDate)
  const [editMode, setEditMode] = useState(false)
  const [optionsAreVisible, setOptionsAreVisible] = useState(false)
  const [confirmMessageIsVisible, setConfirmMessageIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const contentRef = useRef()

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

  const resetList = () => {
    setPinned(false)
    setTitle('')
    setItems([])
  }

  const createList = async event => {
    event.preventDefault()

    const list = {
      pinned,
      title: title.trim(),
      items // trim values
    }
    let savedList

    setLoading(true)

    if (user.name) {
      savedList = (await ws.json({ type: 'createList', newList: list })).newList
      localStorage.setItem('userLists', JSON.stringify([...lists, savedList]))
    } else {
      savedList = { ...list, _id: Date.now(), date: Date.now() }
      localStorage.setItem('lists', JSON.stringify([...lists, savedList]))
    }

    setLoading(false)
    setLists([...lists, savedList])
    resetList()
  }

  const updateList = async event => {
    event.preventDefault()

    const list = {
      _id: listID,
      pinned,
      title: title.trim(),
      items // trim values
    }
    let updatedList

    if (user.name) {
      setLoading(true)

      updatedList = (await ws.json({ type: 'updateList', updatedList: list })).updatedList
      localStorage.setItem(
        'userLists',
        JSON.stringify(lists.map(list => (list._id === updatedList._id ? updatedList : list)))
      )

      setLoading(false)
    } else {
      updatedList = { ...list, date: Date.now() }
      localStorage.setItem(
        'lists',
        JSON.stringify(lists.map(list => (list._id === updatedList._id ? updatedList : list)))
      )
    }

    const date = Date.now()

    setEditMode(false)
    setOptionsAreVisible(false)
    setDate(date)
    setLists(lists.map(originalList => (originalList._id === listID ? { ...list, date } : originalList)))
  }

  const deleteList = async () => {
    if (user.name) {
      setLoading(true)

      const { status } = await ws.json({ type: 'deleteList', listID })

      if (status === 'SUCCESS') {
        setLists(lists.filter(({ _id }) => _id !== listID))
        localStorage.setItem('userLists', JSON.stringify(lists.filter(({ _id }) => _id !== listID)))
      }
    } else {
      localStorage.setItem('lists', JSON.stringify(lists.filter(({ _id }) => _id !== listID)))
    }

    setLists(lists.filter(({ _id }) => _id !== listID))
  }

  return (
    <Wrapper
      faded={loading}
      focused={editMode}
      autoComplete="off"
      onClick={() => {
        if (!newList) setOptionsAreVisible(true)
        setEditMode(true)
      }}
      onMouseLeave={() => {
        setOptionsAreVisible(confirmMessageIsVisible)
        setEditMode(false)
      }}
      onKeyPress={event => {
        if (event.key === 'Enter') event.preventDefault()
      }}
      onSubmit={newList ? createList : updateList}
    >
      <If condition={newList || pinned || optionsAreVisible}>
        <Pin
          pinned={pinned}
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          onClick={() => setPinned(!pinned)}
        />
      </If>

      <If condition={title || newList || editMode}>
        <Title
          value={title}
          dir="auto"
          placeholder={TITLE}
          aria-label="title"
          onChange={event => setTitle(event.target.value)}
        />
      </If>

      <Content as="div" clipped={pinned && !title} ref={contentRef} aria-label="content">
        {items.map(({ value, checked }, ind) => (
          <Item key={ind}>
            <Checked src={checked ? checkedIcon : uncheckedIcon} />

            <Value
              dir={RTL_REGEX.test(value) ? 'rtl' : 'ltr'}
              value={value}
              onChange={event =>
                setItems(prevItems =>
                  prevItems.map((item, index) => (index === ind ? { ...item, value: event.target.value } : item))
                )
              }
              onKeyDown={event => handleBackspacePress(event, ind)}
              onKeyUp={event => handleEnterPress(event, ind)}
              onBlur={() => {
                if (!value) setItems(prevItems => prevItems.filter((_, index) => index !== ind))
              }}
            />
          </Item>
        ))}
      </Content>

      <If condition={optionsAreVisible}>
        <Options onDelete={deleteList} toggleConfirmMessage={mode => setConfirmMessageIsVisible(mode)} />
      </If>

      {confirmMessageIsVisible ? (
        <ConfirmMessage>{DELETE_MESSAGE}</ConfirmMessage>
      ) : newList || editMode ? (
        <Save type="submit" value={SAVE} aria-label="save" />
      ) : (
        <StyledDate>{new Date(date).toLocaleString('en-GB').replace(',', '').slice(0, -3)}</StyledDate>
      )}
    </Wrapper>
  )
}

export default List
