import express, { Request, Response } from 'express';

import User from '../models/user.model';

const router = express.Router();

/* CREATE */
router.post('/:userId/notes', (req: Request, res: Response) => {
    User.findById(req.params.userId)
        .then(async user => {
            user.notes.push(req.body.newNote);
            const { notes } = await user.save();
            res.json(notes[notes.length - 1]);
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* READ */
router.get('/:userId/notes', (req: Request, res: Response) => {
    User.findById(req.params.userId)
        .then(({ notes }) => res.json(notes))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* UPDATE */
router.put('/:userId/notes', (req: Request, res: Response) => {
    const { noteId, updatedNote } = req.body;
    User.findById(req.params.userId)
        .then(async user => {
            user.notes = user.notes.map(note => note._id == noteId ? { ...updatedNote, _id: note._id, date: Date.now() }  : note);
            const { notes } = await user.save();
            res.json(notes.filter(note => note._id == noteId)[0]);
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* DELETE */
router.delete('/:userId/notes', (req: Request, res: Response) => {
    User.findById(req.params.userId)
        .then(user => {
            user.notes = user.notes.filter(note => note._id != req.body.noteId);
            user.save();
            res.send('OK');
        })
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

export default router;