const bcrypt = require('bcryptjs')

const User = require('../models/user.model')

exports.registerUser = (req, res) => {
  const { name, email, password, notes = [] } = req.body

  new User({ name, email, password: bcrypt.hashSync(password), notes })
    .save()
    .then(async ({ _id, name, notes }) => {
      console.log(name + ' registered!')
      req.session.userId = _id
      res.json({ name, notes })
    })
    .catch(({ message, errmsg }) => {
      console.error('Error: ' + message || errmsg)
      res
        .status(409)
        .send('This email address is already registered, try login instead')
    })
}

exports.loginUser = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email })
    .then(async ({ _id, password: hashedPassword, name, notes }) => {
      return bcrypt.compare(password, hashedPassword).then(match => {
        if (match) {
          req.session.userId = _id
          return res.json({ name, notes })
        }
        throw Error
      })
    })
    .catch(() => res.status(404).send('Incorrect email or password'))
}

exports.updateUser = (req, res) => {
  const { name, password, newPassword } = req.body

  User.findById(req.session.userId)
    .then(user => {
      return bcrypt.compare(password, user.password).then(async match => {
        if (match) {
          user.name = name || user.name
          user.password = newPassword
            ? bcrypt.hashSync(newPassword)
            : user.password
          return res.json({ name: (await user.save()).name })
        }
        throw Error
      })
    })
    .catch(() => res.status(404).send('Incorrect password'))
}

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.sendStatus(200)
  })
}
