import { atom } from 'recoil'

export const filesState = atom({
  key: 'filesState',
  default: [],
})

export const loadingFilesState = atom({
  key: 'loadingFilesState',
  default: true,
})
