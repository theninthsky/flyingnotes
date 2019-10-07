import express, { Request, Response } from 'express';

import Note from '../models/note.model';

const router = express.Router();

/* CREATE */
router.post('/notes', (req: Request, res: Response) => {
    const { userId, title, content, color } = req.body;
    const newNote = new Note({ userId, title, content, color });

    newNote.save()
        .then(() => Note.find({userId: req.body.userId}))
        .then(notes => res.json(notes))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

export default router;