import File from '../models/File.js'

export const getFile = (req, res) => {
  if (req.userId) {
    File.findOne({ noteID: req.params.noteID })
      .then(file => {
        if (file) {
          const { mimetype, buffer } = file

          res.setHeader('Content-Type', mimetype)
          res.setHeader('Content-Disposition', 'attachment')
          res.send(buffer)
        }
      })
      .catch(({ message, errmsg }) =>
        console.error(`Error: ${message || errmsg}`),
      )
  }
}
