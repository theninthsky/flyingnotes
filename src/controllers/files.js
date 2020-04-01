import File from '../models/File'

export const getFile = (req, res) => {
  if (req.userId) {
    File.findOne({ noteId: req.params.noteId })
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
