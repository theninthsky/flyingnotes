import express, { Request, Response } from 'express';

import User from '../models/user.model'
import Note from '../models/note.model';
import Feed from '../models/feed.model';

const router = express.Router();

/* CREATE */
router.post('/register', (req: Request, res: Response) => {
    const { name, email, password, theme } = req.body;
    const newUser = new User({ name, email, password, theme });
    
    newUser.save()
        .then(user => {
            console.log(name + ' registered!');
            res.json({status: 'success', data: user._id});
        })
        .catch(({message, errmsg}) => { 
            console.log('Error: ' + message || errmsg);
            res.json({status: 'error', data: 'This email address is already registered, try login instead.'});
        });
});

/* READ */
router.get('/index', async (req: Request, res: Response) => {
    const notes = await Note.find({userId: req.body.userId}) // it is better to call them in parallel (await Promise.all)
        .then(notes => notes)
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
    const feeds = await Feed.find({userId: req.body.userId})
        .then(feeds => feeds)
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
    res.json({ notes: notes, feeds: feeds });
});

/* UPDATE */
router.put('/register', (req: Request, res: Response) => {
    User.findByIdAndUpdate(req.body.userId, req.body, {runValidators: true})
        .then(() => res.send('Successfully updated!'))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* LOGIN */
router.post('/login', (req: Request, res: Response) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user && user.password === req.body.password) {
                res.json({userId: user['_id']});
            } else {
                res.send('Incorrect email or password');
            }
        })
        .catch(({message, errmsg}) => console.log('Error: ' + message || errmsg));
});

export default router;