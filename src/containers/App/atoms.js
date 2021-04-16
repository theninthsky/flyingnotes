import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.user || '{}')
})

export const authVisibleState = atom({
  key: 'authVisibleState',
  default: false
})
