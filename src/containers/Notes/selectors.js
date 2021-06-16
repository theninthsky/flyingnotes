import { selector } from 'recoil'

import { notesState } from './atoms'
import { userLoggedInSelector } from 'containers/App/selectors'

export const notesSelector = selector({
  key: 'notesSelector',
  get: ({ get }) =>
    [...get(notesState)].sort(
      (a, b) => (b.pinned || false) - (a.pinned || false) || new Date(b.date) - new Date(a.date)
    ),
  set: ({ get, set }, notes) => {
    const userLoggedIn = get(userLoggedInSelector)

    localStorage.setItem(userLoggedIn ? 'userNotes' : 'notes', JSON.stringify(notes))
    set(notesState, notes)
  }
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
