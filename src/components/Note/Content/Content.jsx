import { useState, useRef } from 'react'
import useClickOutside from 'use-click-outside'
import TextareaAutosize from 'react-textarea-autosize'
import cx from 'clsx'

import style from './Content.scss'
import CheckedIcon from 'images/checked.svg'
import UncheckedIcon from 'images/unchecked.svg'

const LIST = 'list'
const MAX_INITIAL_ROWS = 6
const emptyItem = { value: '', checked: false }

const Content = ({ variant, empty, content, items, keepExpanded, setContent, setItems, onCheckItem }) => {
  const [rowsHeight, setRowsHeight] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const contentRef = useRef()
  const itemsRef = useRef()

  useClickOutside(contentRef, () => {
    if (!keepExpanded) setExpanded(false)
  })

  const handleEnterPress = (event, index) => {
    if (event.key === 'Enter' && event.target.value) {
      setItems(prevItems => [...prevItems.slice(0, index + 1), emptyItem, ...prevItems.slice(index + 1)])

      const childNodeIndex = empty ? 0 : 1
      const items = itemsRef.current.childNodes
      const nextIndex = [...items].findIndex(item => item.childNodes[childNodeIndex] === event.target) + 1

      setTimeout(() => items[nextIndex].childNodes[childNodeIndex].focus())
    }
  }

  const handleBackspacePress = (event, index) => {
    if ((event.key === 'Backspace' || event.key === 'Delete') && items.length > 1 && !items[index].value) {
      event.preventDefault()

      setItems(prevItems => prevItems.filter((_, ind) => ind !== index))

      const items = itemsRef.current.childNodes
      const prevIndex = [...items].findIndex(item => item.childNodes[1] === event.target) - 1

      setTimeout(() => items[prevIndex > 0 ? prevIndex : 0].childNodes[1].focus())
    }
  }

  const checkItem = (event, index) => {
    event.stopPropagation()

    const item = items[index]

    if (!item.value) return

    const otherItems = items.filter((_, ind) => ind !== index)
    const updatedItems = item.checked
      ? [{ ...item, checked: false }, ...otherItems]
      : [...otherItems, { ...item, checked: true }]

    onCheckItem(updatedItems)
  }

  const hasHiddenContent = variant === LIST ? items.length > 4 : rowsHeight === MAX_INITIAL_ROWS * 20
  const expandable = !expanded && !empty && hasHiddenContent

  return (
    <div className={style.wrapper} ref={contentRef} onClick={() => setExpanded(true)}>
      {expandable && (
        <div
          className={style.cover}
          onClick={event => {
            event.stopPropagation()
            setExpanded(true)
          }}
        ></div>
      )}

      {variant === LIST ? (
        <div
          className={cx(style.content, style.listContent, { [style.listContentExpanded]: expanded })}
          ref={itemsRef}
          aria-label="content"
          onClick={() => {
            if (items.every(({ checked }) => checked)) {
              setItems([emptyItem, ...items])
              setTimeout(() => itemsRef.current.childNodes[0].childNodes[1].focus())
            }
          }}
        >
          {[...items]
            .sort((a, b) => a.checked - b.checked)
            .map(({ value, checked }, ind) => (
              <div className="d-flex" key={ind}>
                {!empty &&
                  (checked ? (
                    <CheckedIcon className={style.checkIcon} onClick={event => checkItem(event, ind)} />
                  ) : (
                    <UncheckedIcon className={style.checkIcon} onClick={event => checkItem(event, ind)} />
                  ))}

                <input
                  className={cx(style.item, { [style.disabled]: checked })}
                  dir="auto"
                  value={value}
                  required
                  disabled={checked}
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
        </div>
      ) : (
        <TextareaAutosize
          className={style.content}
          dir="auto"
          value={content}
          aria-label="content"
          required
          maxRows={expanded ? undefined : MAX_INITIAL_ROWS}
          cacheMeasurements
          onChange={event => setContent(event.target.value)}
          onHeightChange={setRowsHeight}
        />
      )}
    </div>
  )
}

export default Content
