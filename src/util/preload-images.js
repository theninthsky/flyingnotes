import cancelIcon from 'images/cancel.svg'
import confirmIcon from 'images/confirm.svg'
import deleteIcon from 'images/delete.svg'
import downloadIcon from 'images/download.svg'
import lightThemeIcon from 'images/theme-light.svg'
import darkThemeIcon from 'images/theme-dark.svg'

const images = [cancelIcon, confirmIcon, deleteIcon, downloadIcon, lightThemeIcon, darkThemeIcon]

images.forEach(image => {
  const img = new Image()

  img.src = image
})
