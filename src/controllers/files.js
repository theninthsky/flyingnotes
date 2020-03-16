const File = require('../models/file.model')

exports.getFile = (req, res) => {
  File.findOne({ noteId: req.params.noteId })
    .then(({ mimetype, buffer }) => {
      res.setHeader('Content-Type', mimetype)
      res.setHeader('Content-Disposition', 'attachment')
      res.send(buffer)
    })
    .catch(({ message, errmsg }) =>
      console.error('Error: ' + message || errmsg),
    )
}
