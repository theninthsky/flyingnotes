export const fileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

export const base64ToFile = file => {
  const byteString = atob(file.split`,`[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab] /* { type: file.split`,`[0].split`:`[1] } */) // it seems that MIME type is not necessary
}
