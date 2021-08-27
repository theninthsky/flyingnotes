import { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'

const useFetch = options => {
  const { initialUrl, suspense, ...initialFetchOptions } = options

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    if (!suspense) fetchData()
  }, [suspense]) // eslint-disable-line

  const fetchData = async ({ url = initialUrl, ...fetchOptions } = options) => {
    setLoading(true)
    setStatus()
    setError()
    setData()

    const res = await fetch(url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...initialFetchOptions,
      ...fetchOptions
    })
    const data = await res.json()

    batch(() => {
      setLoading(false)
      setStatus(res.status)
      if (!res.ok) setError(data.err)
      setData(data)
    })
  }

  return { loading, status, error, data, trigger: fetchData }
}

export default useFetch
