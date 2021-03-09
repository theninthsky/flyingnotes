import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { createWebSocketConnection, ws } from 'websocket-connection'
import { userState } from 'atoms'
import { notesSelector } from 'selectors'

export const useGetNotes = () => {
  const user = useRecoilValue(userState)
  const [notes, setNotes] = useRecoilState(notesSelector)

  useEffect(() => {
    const getNotes = async () => {
      if (!ws) await createWebSocketConnection()

      const { notes } = await ws.json({ type: 'getNotes' })

      setNotes(notes)
      localStorage.userNotes = JSON.stringify(notes)
    }

    if (user.name) getNotes()
  }, [user.name, setNotes])

  return notes
}
