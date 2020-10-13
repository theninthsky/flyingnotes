import { CHANGE_THEME, TOGGLE_AUTH } from './actionTypes'

export const changeTheme = () => {
  const theme = localStorage.theme === 'light' ? 'dark' : 'light'

  localStorage.setItem('theme', theme)

  return { type: CHANGE_THEME, theme }
}

export const toggleAuth = () => ({ type: TOGGLE_AUTH })
