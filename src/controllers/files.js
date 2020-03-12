const File = require('../models/file.model')

exports.getFile = (req, res) => {
  File.findOne({ noteId: req.params.noteId })
    .then(({ mimetype, buffer }) => {
      res.json({ mimetype, base64: Buffer.from(buffer).toString('base64') })
    })
    .catch(({ message, errmsg }) =>
      console.error('Error: ' + message || errmsg),
    )
}
