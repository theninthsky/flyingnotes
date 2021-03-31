import { selector } from 'recoil'

import { userState } from 'atoms'

export const userLoggedInSelector = selector({
  key: 'userLoggedInSelector',
  get: ({ get }) => !!get(userState).name
})
