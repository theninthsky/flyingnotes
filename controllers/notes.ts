import { Request, Response } from 'express'

import User from '../models/user.model'

export const createNote = (req: Request, res: Response) => {
    User.findById(req.session.userId, { 'notes.file.content': 0 })
        .then(async user => {
            user.notes.push({ ...req.body.newNote, date: Date.now() })
            const { notes } = await user.save()
            res.json(notes[notes.length - 1])
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

export const getNotes = (req: Request, res: Response) => {
    User.findById(req.session.userId, { 'notes.file.content': 0 })
        .then(({ notes }) => {
            res.json({ notes })
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

export const getFile = (req: Request, res: Response) => {
    User.findById(req.session.userId)
        .then(({ notes }) => {
            const { file } = notes.find(note => note._id == req.params.noteId)
            res.json({ file })
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

export const updateNote = (req: Request, res: Response) => {
    const { updatedNote, updatedNote: { _id: noteId } } = req.body
    User.findById(req.session.userId, { 'notes.file.content': 0 })
        .then(async user => {
            user.notes = user.notes.map(note => note._id == noteId ? { ...updatedNote, date: Date.now() } : note)
            const { notes } = await user.save()
            res.json({ updatedNote: notes.find(note => note._id == noteId) })
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

export const deleteNote = (req: Request, res: Response) => {
    User.findById(req.session.userId)
        .then(user => {
            user.notes = user.notes.filter(note => note._id != req.body.noteId)
            user.save()
                .then(() => res.sendStatus(200))
        })
        .catch(({ message, errmsg }) => {
            console.log('Error: ' + message || errmsg)
            res.sendStatus(404)
        })
}