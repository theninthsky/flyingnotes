import { CHANGE_THEME } from './actionTypes'

export const changeTheme = () => {
  const theme = localStorage.theme === 'light' ? 'dark' : 'light'

  localStorage.setItem('theme', theme)

  return { type: CHANGE_THEME, theme }
}
