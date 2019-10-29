import express, { Request, Response } from 'express';

import User from '../models/user.model'

const router = express.Router();

/* REGISTER */
router.post('/register', (req: Request, res: Response) => {
    const { name, email, password, theme, notes } = req.body;
    const newUser = new User({ name, email, password, theme, notes: notes || [] });
    
    newUser.save()
        .then(async ({ _id, name, notes }) => {
            console.log(name + ' registered!');
            res.json({ userId: _id, name, notes });
        })
        .catch(({message, errmsg}) => { 
            console.log('Error: ' + message || errmsg);
            res.send('This email address is already registered, try login instead.');
        });
});

/* LOGIN */
router.post('/login', (req: Request, res: Response) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(async ({ _id, name, notes }) => {
            res.json({ userId: _id, name: name, notes });
        })
        .catch(() => res.send('Incorrect email or password'));
});

/* UPDATE */
router.put('/register', (req: Request, res: Response) => {
    User.findByIdAndUpdate(req.body.userId, req.body, {runValidators: true})
        .then(note => res.json(note))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

export default router;