import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userLoggedInSelector } from 'containers/App/selectors'
import { notesSelector } from 'containers/Notes/selectors'

const useGetNotes = () => {
  const userLoggedIn = useRecoilValue(userLoggedInSelector)
  const [notes, setNotes] = useRecoilState(notesSelector)

  useEffect(() => {
    const getNotes = async () => {
      if (!ws) await createWebSocketConnection()

      const { notes } = await ws.json({ type: 'getNotes' })

      setNotes(notes)
    }

    if (userLoggedIn) getNotes()
  }, [userLoggedIn, setNotes])

  return notes
}

export default useGetNotes
