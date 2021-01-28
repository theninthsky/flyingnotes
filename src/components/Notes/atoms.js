import { atom } from 'recoil'

export const notesState = atom({
  key: 'notesState',
  default: JSON.parse((localStorage.user ? localStorage.userNotes : localStorage.notes) || '[]')
})
