import { atom } from 'recoil'

export const themeState = atom({
  key: 'theme',
  default: localStorage.theme || 'light',
})

export const authIsOpenState = atom({
  key: 'authIsOpen',
  default: false,
})
