import { Request, Response } from 'express'

import User from '../models/User'
import File from '../models/File'

export const createNote = (req: Request, res: Response) => {
  const { file } = req

  User.findById(req.session!.userId)
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
            noteId: notes[notes.length - 1]._id,
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

export const getNotes = (req: Request, res: Response) => {
  User.findById(req.session!.userId)
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

export const updateNote = (req: Request, res: Response) => {
  const { file } = req

  User.findById(req.session!.userId)
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
            { noteId: req.body._id },
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

export const deleteNote = (req: Request, res: Response) => {
  const { noteId } = req.body

  User.findById(req.session!.userId)
    .then(user => {
      if (user) {
        if (user.notes.find(note => note._id == noteId)) {
          user.notes = user.notes.filter(note => note._id != noteId)
          user.save().then(() => res.sendStatus(200))

          File.findOneAndDelete({ noteId }).then(() => {})
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
