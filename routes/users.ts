import express, { Request, Response } from 'express';

import User from '../models/user.model'
import Note from '../models/note.model';
import Feed from '../models/feed.model';

const router = express.Router();

const findData = async (userId: string) => {
    const [notes, feeds] = await Promise.all([Note.find({userId: userId}), Feed.find({userId: userId})]);
    // const notes = await Note.find({userId: userId}) // it is better to call them in parallel (await Promise.all)
    //     .then(notes => notes)
    //     .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
    // const feeds = await Feed.find({userId: userId})
    //     .then(feeds => feeds)
    //     .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
    return { notes: notes, feeds: feeds };
};

/* CREATE */
router.post('/register', (req: Request, res: Response) => {
    const { name, email, password, theme, data } = req.body;
    const newUser = new User({ name, email, password, theme, ...data });
    
    newUser.save()
        .then(async user => {
            console.log(name + ' registered!');
            const data = await findData(user._id);
            res.json({ userId: user._id, name: user.name, ...data });
        })
        .catch(({message, errmsg}) => { 
            console.log('Error: ' + message || errmsg);
            res.json({data: 'This email address is already registered, try login instead.'});
        });
});

/* READ */
router.get('/user/:userId', async (req: Request, res: Response) => {
    res.json(await findData(req.params.userId));
});

/* UPDATE */
router.put('/register', (req: Request, res: Response) => {
    User.findByIdAndUpdate(req.body.userId, req.body, {runValidators: true})
        .then(note => res.json(note))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* LOGIN */
router.post('/login', (req: Request, res: Response) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(async user => {
            const data = await findData(user._id);
            res.json({ userId: user['_id'], name: user.name, ...data });
        })
        .catch(() => res.send('Incorrect email or password'));
});

export default router;