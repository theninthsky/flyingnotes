import { useState, useEffect } from 'react'

const useFetch = options => {
  const { url, suspense, ...fetchOptions } = options

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    if (!suspense) fetchData()
  }, [suspense])

  const fetchData = async (extendedOptions = {}) => {
    setLoading(true)

    const res = await fetch(extendedOptions.url || url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...fetchOptions,
      ...extendedOptions
    })
    const data = await res.json()

    setLoading(false)
    if (!res.ok) setError(data.err)
    setData(data)
  }

  return { loading, error, data, trigger: fetchData }
}

export default useFetch
