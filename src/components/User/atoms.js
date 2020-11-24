import { atom } from 'recoil'

export const userState = atom({
  key: 'user',
  default: { name: localStorage.name },
})

export const errorMessageState = atom({
  key: 'errorMessage',
  default: null,
})
