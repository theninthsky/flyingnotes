import { atom } from 'recoil'

const { user, userLists, lists } = localStorage

export const listsState = atom({
  key: 'listsState',
  default: JSON.parse((JSON.parse(user).name ? userLists : lists) || '[]')
})
