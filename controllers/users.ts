import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import User from '../models/user.model'

export const registerUser = (req: Request, res: Response) => {
    const { name, email, password, notes = [] } = req.body
    const newUser = new User({ name, email, password: bcrypt.hashSync(password), notes })

    newUser.save()
        .then(async ({ _id, name, notes }) => {
            console.log(name + ' registered!')
            req.session.userId = _id
            res.json({ name, notes })
        })
        .catch(({ message, errmsg }) => {
            console.log('Error: ' + message || errmsg)
            res.status(409).send('This email address is already registered, try login instead')
        })
}

export const loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body
    
    User.findOne({ email })
        .then(async ({ _id, password: hashedPassword, name, notes }) => {
            return bcrypt.compare(password, hashedPassword)
                .then(match => {
                    if (match) {
                        req.session.userId = _id
                        return res.json({ name, notes })
                    }
                    throw Error
                })
        })
        .catch(() => res.status(404).send('Incorrect email or password'))
}

export const updateUser = (req: Request, res: Response) => {
    const { name, password, newPassword } = req.body
    
    User.findById(req.session.userId)
        .then(user => {
            return bcrypt.compare(password, user.password)
                .then(async match => {
                    if (match) {
                        user.name = name || user.name
                        user.password = bcrypt.hashSync(newPassword) || user.password
                        return res.json({ name: (await user.save()).name })
                    }
                    throw Error
                });
        })
        .catch(() => res.status(404).send('Incorrect password'))
}

export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.sendStatus(200)
    })
}