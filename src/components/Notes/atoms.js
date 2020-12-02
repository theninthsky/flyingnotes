import { atom } from 'recoil'

export const notesState = atom({
  key: 'notesState',
  default: []
})

export const loadingNotesState = atom({
  key: 'loadingNotesState',
  default: true
})
