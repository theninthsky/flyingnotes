import { selector } from 'recoil'

import { notesState } from '../../atoms'

export const notesSelector = selector({
  key: 'notesSelector',
  get: ({ get }) => [...get(notesState)].sort((a, b) => new Date(b.date) - new Date(a.date)),
  set: ({ set }, newValue) => set(notesState, newValue),
})
