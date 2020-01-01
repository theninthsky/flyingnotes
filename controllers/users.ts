import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/user.model'

export const registerUser = (req: Request, res: Response) => {
    const { name, email, password, notes } = req.body;
    const newUser = new User({ name, email, password: bcrypt.hashSync(password), notes: notes || [] });

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
    User.findOne({ email: req.body.email })
        .then(async ({ _id, password: hashedPassword, name, notes }) => {
            return bcrypt.compare(req.body.password, hashedPassword)
                .then(match => {
                    if (match) {
                        req.session.userId = _id;
                        res.cookie('loggedin', 'true');
                        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                        return res.json({ userId: _id, name: name, notes });
                    }
                    throw Error;
                })
        })
        .catch(() => res.status(404).send('Incorrect email or password'));
};

export const updateUser = (req: Request, res: Response) => {
    const { userId, name, password, newPassword } = req.body;
    User.findById(userId)
        .then(user => {
            return bcrypt.compare(password, user.password)
                .then(async match => {
                    if (match) {
                        user.name = name || user.name;
                        user.password = bcrypt.hashSync(newPassword) || user.password;
                        return res.json({ name: (await user.save()).name });
                    }
                    throw Error;
                });
        })
        .catch(() => res.status(404).send('Incorrect password'));
};