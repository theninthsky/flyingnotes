import { atom } from 'recoil'

export const themeState = atom({
  key: 'themeState',
  default: localStorage.theme || 'light',
})

export const authIsOpenState = atom({
  key: 'authIsOpenState',
  default: false,
})
