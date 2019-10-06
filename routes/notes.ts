import express, { Request, Response } from 'express';

import Note from '../models/note.model';

const router = express.Router();

router.post('/notes', (req: Request, res: Response) => {
    const { title, content, color } = req.body;
    const newNote = new Note({title, content, color });

    newNote.save()
        .then(({title}) => console.log(title + ' note added!'))
        .catch(({message, errmsg}) => console.log('Error: ' + message || errmsg));
});

export default router;