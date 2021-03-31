import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.user || '{}')
})

export const authIsVisibleState = atom({
  key: 'authIsVisibleState',
  default: false
})
