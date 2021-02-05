import { selector } from 'recoil'

import { listsState } from 'atoms'

export const listsSelector = selector({
  key: 'listsSelector',
  get: ({ get }) =>
    [...get(listsState)].sort(
      (a, b) => (b.pinned || false) - (a.pinned || false) || new Date(b.date) - new Date(a.date)
    ),
  set: ({ set }, lists) => set(listsState, lists)
})
