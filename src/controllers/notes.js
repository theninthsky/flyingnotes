import User from '../models/User.js'
import File from '../models/File.js'

export const getNotes = (req, res) => {
  User.findById(req.userId)
    .then(user => {
      if (user) {
        res.json({ notes: user.notes })
      }
    })
    .catch(() => {
      console.error('Error: Session expired')
      res.status(401).send('Not authenticated')
    })
}

export const createNote = (req, res) => {
  const { file } = req

  User.findById(req.userId)
    .then(async user => {
      if (user) {
        user.notes.push({
          ...req.body,
          fileName: file && file.originalname,
          date: Date.now(),
        })
        const { notes } = await user.save()

        if (file) {
          const { mimetype, buffer } = file

          await new File({
            noteID: notes[notes.length - 1]._id,
            mimetype,
            buffer,
          }).save()
        }

        res.json({ newNote: notes[notes.length - 1] })
      }
    })
    .catch(({ message, errmsg }) =>
      console.error(`Error: ${message || errmsg}`),
    )
}

export const updateNote = (req, res) => {
  const { file } = req

  User.findById(req.userId)
    .then(async user => {
      if (user) {
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
            { noteID: req.body._id },
            { mimetype, buffer },
          ).then(file => {
            if (!file) {
              new File({ noteId: req.body._id, mimetype, buffer }).save()
            }
          })
        }

        res.json({ updatedNote: notes.find(note => note._id == req.body._id) })
      }
    })
    .catch(({ message, errmsg }) =>
      console.error(`Error: ${message || errmsg}`),
    )
}

export const deleteNote = (req, res) => {
  const { noteID } = req.body

  User.findById(req.userId)
    .then(user => {
      if (user) {
        if (user.notes.find(note => note._id == noteID)) {
          user.notes = user.notes.filter(note => note._id != noteID)
          user.save().then(() => res.sendStatus(200))

          File.findOneAndDelete({ noteID }).then(() => {})
        } else {
          res.sendStatus(404)
        }
      }
    })
    .catch(({ message, errmsg }) => {
      console.error(`Error: ${message || errmsg}`)
      res.redirect('/')
    })
}
