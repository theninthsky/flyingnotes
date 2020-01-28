const File = require('../models/file.model')

exports.getFile = (req, res) => {
  File.findOne({ noteId: req.params.noteId })
    .then(({ dataUri }) => res.json({ file: dataUri }))
    .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

exports.deleteFile = (req, res) => {
  File.findOneAndDelete({ noteId: req.body.noteId })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404))
}
