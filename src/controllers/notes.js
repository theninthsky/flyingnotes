const User = require('../models/user.model')
const File = require('../models/file.model')

exports.createNote = (req, res) => {
  const { file } = req

  User.findById(req.session.userId)
    .then(async user => {
      user.notes.push({
        ...req.body,
        fileName: file && file.originalname,
        date: Date.now(),
      })
      const { notes } = await user.save()

      if (file) {
        const { mimetype, buffer } = file

        await new File({
          noteId: notes[notes.length - 1]._id,
          mimetype,
          buffer,
        }).save()
      }

      res.json({ newNote: notes[notes.length - 1] })
    })
    .catch(({ message, errmsg }) =>
      console.error('Error: ' + message || errmsg),
    )
}

exports.getNotes = (req, res) => {
  User.findById(req.session.userId)
    .then(({ notes }) => res.json({ notes }))
    .catch(() => {
      console.error('Error: Session expired.')
      res.status(401).send('Not authenticated')
    })
}

exports.updateNote = (req, res) => {
  const { file } = req

  User.findById(req.session.userId)
    .then(async user => {
      user.notes = user.notes.map(note =>
        note._id == req.body._id
          ? {
              ...req.body,
              fileName: file ? file.originalname : note.fileName,
              date: Date.now(),
            }
          : note,
      )
      const { notes } = await user.save()

      if (file) {
        const { mimetype, buffer } = file

        await File.findOneAndUpdate(
          { noteId: req.body._id },
          { mimetype, buffer },
        ).then(file => {
          if (!file) {
            new File({ noteId: req.body._id, mimetype, buffer }).save()
          }
        })
      }

      res.json({ updatedNote: notes.find(note => note._id == req.body._id) })
    })
    .catch(({ message, errmsg }) =>
      console.error('Error: ' + message || errmsg),
    )
}

exports.deleteNote = (req, res) => {
  const { noteId } = req.body

  User.findById(req.session.userId)
    .then(user => {
      if (user.notes.find(note => note._id == noteId)) {
        user.notes = user.notes.filter(note => note._id != noteId)
        user.save().then(() => res.sendStatus(200))

        return File.findOneAndDelete({ noteId }).then(() => {})
      }
      throw Error
    })
    .catch(({ message, errmsg }) => {
      console.error('Error: ' + message || errmsg)
      res.sendStatus(404)
    })
}
