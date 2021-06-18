import { useState, useEffect, useRef } from 'react'
import { number, string, array, func } from 'prop-types'

const LazyRender = ({ batch, items, setItems, rootMargin = '200px' }) => {
  const [renderLimit, setRenderLimit] = useState(0)

  const targetRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (renderLimit >= items.length) return observer.unobserve(targetRef.current)
        if (isIntersecting) setRenderLimit(renderLimit + batch)
      },
      { rootMargin }
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
  setItems: func.isRequired,
  rootMargin: string
}

export default LazyRender
