import express, { Request, Response } from 'express';

import Note from '../models/note.model';

const router = express.Router();

/* CREATE */
router.post('/notes', (req: Request, res: Response) => {
    const { userId, group, title, content, color } = req.body;
    const newNote = new Note({ userId, group, title, content, color });

    newNote.save()
        .then(note => res.json(note))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* UPDATE */
router.put('/notes', (req: Request, res: Response) => {
    Note.findByIdAndUpdate(req.body.noteId, { ...req.body, date: Date.now() }, { new: true, runValidators: true })
        .then(note => res.json(note))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* DELETE */
router.delete('/notes', (req: Request, res: Response) => {
    Note.findByIdAndDelete(req.body.noteId)
        .then(() => res.send('DELETED'))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

export default router;