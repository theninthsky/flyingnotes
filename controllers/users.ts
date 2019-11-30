import { Request, Response } from 'express';

import User from '../models/user.model'

export const registerUser = (req: Request, res: Response) => {
    const { name, email, password, notes } = req.body;
    const newUser = new User({ name, email, password, notes: notes || [] });

    newUser.save()
        .then(async ({ _id, name, notes }) => {
            console.log(name + ' registered!');
            res.json({ userId: _id, name, notes });
        })
        .catch(({ message, errmsg }) => {
            console.log('Error: ' + message || errmsg);
            res.status(409).send('This email address is already registered, try login instead');
        });
};

export const loginUser = (req: Request, res: Response) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(async ({ _id, name, notes }) => {
            res.json({ userId: _id, name: name, notes });
        })
        .catch(() => res.status(404).send('Incorrect email or password'));
};

export const updateUser = (req: Request, res: Response) => {
    const { userId, name, password, newPassword } = req.body;
    User.findOne({ _id: userId, password })
        .then(async user => {
            user.name = name || user.name;
            user.password = newPassword || user.password;
            res.json({ name: (await user.save()).name });
        })
        .catch(() => res.status(404).send('Incorrect password'));
};