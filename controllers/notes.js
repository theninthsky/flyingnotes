const User = require('../models/user.model')
const File = require('../models/file.model')

exports.createNote = (req, res) => {
  const { file } = req.body.newNote
  delete req.body.newNote.file

  User.findById(req.session.userId)
    .then(async user => {
      user.notes.push({ ...req.body.newNote, date: Date.now() })
      const { notes } = await user.save()

      if (file) {
        new File({ noteId: notes[notes.length - 1]._id, base64: file }).save()
      }

      res.json(notes[notes.length - 1])
    })
    .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

exports.getNotes = (req, res) => {
  User.findById(req.session.userId)
    .then(({ notes }) => res.json({ notes }))
    .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

exports.updateNote = (req, res) => {
  const { updatedNote } = req.body

  User.findById(req.session.userId)
    .then(async user => {
      user.notes = user.notes.map(note =>
        note._id == updatedNote._id
          ? { ...updatedNote, date: Date.now() }
          : note
      )
      const { notes } = await user.save()
      res.json({ updatedNote: notes.find(note => note._id == updatedNote._id) })
    })
    .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))

  if (updatedNote.file) {
    File.findOneAndUpdate(
      { noteId: updatedNote._id },
      { base64: updatedNote.file }
    ).then(file => {
      if (!file) {
        new File({ noteId: updatedNote._id, base64: updatedNote.file }).save()
      }
    })
  }
}

exports.deleteNote = (req, res) => {
  User.findById(req.session.userId)
    .then(user => {
      user.notes = user.notes.filter(note => note._id != req.body.noteId)
      user.save().then(() => res.sendStatus(200))
    })
    .catch(({ message, errmsg }) => {
      console.log('Error: ' + message || errmsg)
      res.sendStatus(404)
    })

  File.findOneAndDelete({ noteId: req.body.noteId }).then(() => {})
}
