import { Request, Response } from 'express'

import User from '../models/user.model'
import File from '../models/file.model'

export const createNote = (req: Request, res: Response) => {
    const { file } = req.body.newNote
    delete req.body.newNote.file

    User.findById(req.session.userId)
        .then(async user => {
            user.notes.push({ ...req.body.newNote, date: Date.now() })
            const { notes } = await user.save()

            if (file) {
                new File({ noteId: notes[notes.length - 1]._id, base64: file })
                    .save()
            }

            res.json(notes[notes.length - 1])
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

export const getNotes = (req: Request, res: Response) => {
    User.findById(req.session.userId)
        .then(({ notes }) => res.json({ notes }))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

export const updateNote = (req: Request, res: Response) => {
    const { updatedNote } = req.body

    User.findById(req.session.userId)
        .then(async user => {
            user.notes = user.notes.map(note => note._id == updatedNote._id ? { ...updatedNote, date: Date.now() } : note)
            const { notes } = await user.save()
            res.json({ updatedNote: notes.find(note => note._id == updatedNote._id) })
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))

    if (updatedNote.file) {
        File.findOneAndUpdate({ noteId: updatedNote._id }, { base64: updatedNote.file })
            .then(file => {
                if (!file) {
                    new File({ noteId: updatedNote._id, base64: updatedNote.file })
                        .save()
                }
            })
    }
}

export const deleteNote = (req: Request, res: Response) => {
    User.findById(req.session.userId)
        .then(user => {
            user.notes = user.notes.filter(note => note._id != req.body.noteId)
            user.save().then(() => res.sendStatus(200))
        })
        .catch(({ message, errmsg }) => {
            console.log('Error: ' + message || errmsg)
            res.sendStatus(404)
        })

    File.findOneAndDelete({ noteId: req.body.noteId }).then(() => { })
}