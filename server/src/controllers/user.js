import bcrypt from 'bcryptjs'

import User from '../models/User.js'

export const registerUser = (req, res) => {
  const { name, email, password, notes = [] } = req.body

  new User({ name, email, password: bcrypt.hashSync(password), notes })
    .save()
    .then(async ({ _id, name, notes }) => {
      console.log(name + ' registered')

      req.session.userID = _id
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
            req.session.userID = _id
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
  User.findById(req.userID)
    .then(async user => {
      if (user) {
        user.name = req.body.name
        await user.save()
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(({ message, errmsg }) =>
      console.error(`Error: ${message || errmsg}`),
    )
}

export const changePassword = (req, res) => {
  const { password, newPassword } = req.body

  User.findById(req.userID)
    .then(async user => {
      if (user) {
        try {
          const match = await bcrypt.compare(password, user.password)

          if (match) {
            user.password = bcrypt.hashSync(newPassword)
            await user.save()
            res.sendStatus(200)
          } else {
            res.status(404).send('Incorrect password')
          }
        } catch ({ message }) {
          throw Error(message)
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(({ message, errmsg }) =>
      console.error(`Error: ${message || errmsg}`),
    )
}

export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.sendStatus(200)
  })
}
