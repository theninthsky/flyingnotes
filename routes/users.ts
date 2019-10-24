import express, { Request, Response } from 'express';

import User from '../models/user.model'
import Note from '../models/note.model';

const router = express.Router();

const findNotes = async (userId: string) => await Note.find({userId: userId});

/* REGISTER */
router.post('/register', (req: Request, res: Response) => {
    const { name, email, password, theme, data } = req.body;
    const newUser = new User({ name, email, password, theme, ...data });
    
    newUser.save()
        .then(async user => {
            console.log(name + ' registered!');
            const data = await findNotes(user._id);
            res.json({ userId: user._id, name: user.name, ...data });
        })
        .catch(({message, errmsg}) => { 
            console.log('Error: ' + message || errmsg);
            res.send('This email address is already registered, try login instead.');
        });
});

/* LOGIN */
router.post('/login', (req: Request, res: Response) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(async user => {
            const notes = await findNotes(user._id);
            res.json({ userId: user['_id'], name: user.name, notes });
        })
        .catch(() => res.send('Incorrect email or password'));
});

/* READ */
router.get('/users/:userId', async (req: Request, res: Response) => {
    res.json(await findNotes(req.params.userId));
});

/* UPDATE */
router.put('/register', (req: Request, res: Response) => {
    User.findByIdAndUpdate(req.body.userId, req.body, {runValidators: true})
        .then(note => res.json(note))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

export default router;