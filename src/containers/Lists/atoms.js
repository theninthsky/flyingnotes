import { atom } from 'recoil'

const { user, userLists, lists } = localStorage
const userLoggedIn = !!JSON.parse(user || '{}').name

export const listsState = atom({
  key: 'listsState',
  default: JSON.parse((userLoggedIn ? userLists : lists) || '[]')
})
