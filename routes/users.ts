import express, { Request, Response } from 'express';

import User from '../models/user.model';

const router = express.Router();

/* REGISTER */
router.post('/register', (req: Request, res: Response) => {
    const { name, email, password, theme } = req.body;
    const newUser = new User({ name, email, password, theme });
    
    newUser.save()
        .then(({name}) => console.log(name + ' registered!'))
        .catch(({message, errmsg}) => console.log('Error: ' + message || errmsg));
});

/* LOGIN */
router.post('/login', (req: Request, res: Response) => {
    User.findOne({ email: req.body.email })
        .then(({password, notes}) => {
            if (password === req.body.password) {
                res.json(notes);
            } else {
                res.send('Incorrect email or password');
            }
        })
        .catch(({message, errmsg}) => console.log('Error: ' + message || errmsg));
});

export default router;