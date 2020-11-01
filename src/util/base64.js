export const toBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const fromBase64 = async (name, base64) => {
  const mimeType = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1]
  const res = await fetch(base64)
  const blob = await res.blob()

  console.log(mimeType)

  return new File([blob], name, { type: mimeType })
}

export const saveFile = (name, extension, attachment) => {
  const link = document.createElement('a')

  link.href = window.URL.createObjectURL(new Blob([attachment]))
  link.setAttribute('download', `${name}.${extension}`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
