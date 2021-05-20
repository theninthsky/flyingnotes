import { atom } from 'recoil'

const { user, userNotes, notes } = localStorage

export const notesState = atom({
  key: 'notesState',
  default: JSON.parse((JSON.parse(user).name ? userNotes : notes) || '[]')
})
