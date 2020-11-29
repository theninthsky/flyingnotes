import { selector } from 'recoil'

import { notesState } from 'atoms'

export const notesSelector = selector({
  key: 'notesSelector',
  get: ({ get }) => [...get(notesState)].sort((a, b) => new Date(b.date) - new Date(a.date)),
  set: ({ set }, newValue) => set(notesState, newValue)
})

export const categoriesSelector = selector({
  key: 'categoriesSelector',
  get: ({ get }) => [
    ...new Set(
      [...get(notesState)]
        .map(({ category }) => category)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
    )
  ]
})
