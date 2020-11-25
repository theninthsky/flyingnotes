import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: { name: localStorage.name },
})

export const errorMessageState = atom({
  key: 'errorMessageState',
  default: null,
})
