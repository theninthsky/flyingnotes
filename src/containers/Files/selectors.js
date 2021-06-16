import { selector } from 'recoil'

import { filesState } from './atoms'

export const filesSelector = selector({
  key: 'filesSelector',
  get: ({ get }) => [...get(filesState)].sort((a, b) => new Date(b.date) - new Date(a.date)),
  set: ({ set }, newValue) => set(filesState, newValue)
})
