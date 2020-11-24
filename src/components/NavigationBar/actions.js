export const toggleTheme = (theme, setTheme) => {
  const newTheme = theme === 'dark' ? 'light' : 'dark'

  setTheme(newTheme)
  localStorage.setItem('theme', newTheme)
}
