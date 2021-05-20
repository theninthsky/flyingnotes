import { selector } from 'recoil'

import { listsState } from 'atoms'
import { userLoggedInSelector } from 'selectors'

export const listsSelector = selector({
  key: 'listsSelector',
  get: ({ get }) =>
    [...get(listsState)].sort(
      (a, b) => (b.pinned || false) - (a.pinned || false) || new Date(b.date) - new Date(a.date)
    ),
  set: ({ get, set }, lists) => {
    const userLoggedIn = get(userLoggedInSelector)

    localStorage.setItem(userLoggedIn ? 'userLists' : 'lists', JSON.stringify(lists))
    set(listsState, lists)
  }
})
