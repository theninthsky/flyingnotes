import { selector } from 'recoil'

import { userState } from './atoms'

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => get(userState),
  set: ({ set }, user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set(userState, user)
  }
})

export const userLoggedInSelector = selector({
  key: 'userLoggedInSelector',
  get: ({ get }) => !!get(userState).name
})
