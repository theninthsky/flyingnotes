import { atom } from 'recoil'

const { user, userNotes, notes } = localStorage
const userLoggedIn = !!JSON.parse(user || '{}').name

export const notesState = atom({
  key: 'notesState',
  default: JSON.parse((userLoggedIn ? userNotes : notes) || '[]')
})
