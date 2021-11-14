import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: null
})

export const authVisibleState = atom({
  key: 'authVisibleState',
  default: false
})
