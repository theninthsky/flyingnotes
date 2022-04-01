import { cloneElement, useEffect, useRef } from 'react'

const ClickOutsideListener = ({ additionalRef, children, onClickOutside }) => {
  const ref = useRef()

  const handleEvent = event => {
    if (!ref.current?.contains(event.target)) onClickOutside(event)
  }

  useEffect(() => {
    document.addEventListener('click', handleEvent, { capture: true })

    return () => document.removeEventListener('click', handleEvent, { capture: true })
  })

  return cloneElement(children, {
    ref: node => {
      ref.current = node
      if (additionalRef) additionalRef.current = node
    }
  })
}

export default ClickOutsideListener
