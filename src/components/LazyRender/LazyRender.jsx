import { useState, useEffect, useRef } from 'react'
import { number, array, func } from 'prop-types'

const LazyRender = ({ batch, items, setItems }) => {
  const [renderLimit, setRenderLimit] = useState(0)

  const targetRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (renderLimit >= items.length) return observer.unobserve(targetRef.current)
        if (isIntersecting) setRenderLimit(renderLimit + batch)
      },
      { rootMargin: '200px' }
    )

    observer.observe(targetRef.current)

    setItems(items.slice(0, renderLimit))

    return () => observer.disconnect()
  }, [items, batch, renderLimit, setItems])

  useEffect(() => {
    setItems(items.slice(0, batch))
    setRenderLimit(batch)
  }, [items]) // eslint-disable-line

  return <div ref={targetRef}></div>
}

LazyRender.propTypes = {
  batch: number.isRequired,
  items: array.isRequired,
  setItems: func.isRequired
}

export default LazyRender
