import { atom } from 'recoil'

export const listsState = atom({
  key: 'listsState',
  default: JSON.parse((localStorage.user ? localStorage.userLists : localStorage.lists) || '[]')
})
