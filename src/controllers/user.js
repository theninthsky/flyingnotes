import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN = 3600 * 24 * 365, // 1 year
} = process.env

const generateToken = (res, _id, name, email) => {
  const payload = {
    iss: 'flyingnotes',
    _id,
    name,
    email,
  }

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })

  res.setHeader(
    'Set-Cookie',
    `Bearer=${accessToken}; Max-Age=${ACCESS_TOKEN_EXPIRES_IN}; SameSite=Strict; HttpOnly;`,
  )
}

export const registerUser = (req, res) => {
  const { name, email, password, notes = [] } = req.body

  new User({ name, email, password: bcrypt.hashSync(password), notes })
    .save()
    .then(async ({ _id, name, notes }) => {
      console.log(name + ' registered')

      generateToken(res, _id, name, email)

      res.json({ name, notes })
    })
    .catch(({ message, errmsg }) => {
      console.error(`Error: ${message || errmsg}`)
      res
        .status(409)
        .send('This email address is already registered, try login instead')
    })
}

export const loginUser = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email: email.toLowerCase() })
    .then(async user => {
      if (user) {
        const { _id, password: hashedPassword, name, notes } = user

        try {
          const match = await bcrypt.compare(password, hashedPassword)

          if (match) {
            generateToken(res, _id, name, email)

            res.json({ name, notes })
          } else {
            res.status(404).send('Incorrect email or password')
          }
        } catch ({ message }) {
          throw Error(message)
        }
      } else {
        res.status(404).send('No such user exists')
      }
    })
    .catch(({ message, errmsg }) =>
      console.error(`Error: ${message || errmsg}`),
    )
}

export const updateUser = (req, res) => {
  const { name, password, newPassword } = req.body

  User.findById(req.userId)
    .then(async user => {
      if (user) {
        try {
          const match = await bcrypt.compare(password, user.password)

          if (match) {
            user.name = name || user.name
            user.password = newPassword
              ? bcrypt.hashSync(newPassword)
              : user.password
            res.json({ name: (await user.save()).name })
          } else {
            res.status(404).send('Incorrect password')
          }
        } catch ({ message }) {
          throw Error(message)
        }
      } else {
        res.status(404).send('No such user exists, try registering instead')
      }
    })
    .catch(({ message, errmsg }) =>
      console.error(`Error: ${message || errmsg}`),
    )
}

export const logoutUser = (_, res) => {
  res.setHeader(
    'Set-Cookie',
    'Bearer=deleted; expires=Thu, Jan 01 1970 00:00:00 UTC',
  )
  res.sendStatus(200)
}
