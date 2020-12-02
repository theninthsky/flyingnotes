import cancelIcon from 'assets/images/cancel.svg'
import confirmIcon from 'assets/images/confirm.svg'
import deleteIcon from 'assets/images/delete.svg'
import downloadIcon from 'assets/images/download.svg'
import lightThemeIcon from 'assets/images/theme-light.svg'
import darkThemeIcon from 'assets/images/theme-dark.svg'

const images = [cancelIcon, confirmIcon, deleteIcon, downloadIcon, lightThemeIcon, darkThemeIcon]

images.forEach(image => {
  const img = new Image()

  img.src = image
})
