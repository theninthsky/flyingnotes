import { atom } from 'recoil'

export const themeState = atom({
  key: 'themeState',
  default: localStorage.theme || 'light',
})

export const authIsVisibleState = atom({
  key: 'authIsVisibleState',
  default: false,
})
