import { atom } from 'recoil'

export const notesState = atom({
  key: 'notesState',
  default: [],
})

export const notesLoadingState = atom({
  key: 'notesAreLoadingState',
  default: true,
})
