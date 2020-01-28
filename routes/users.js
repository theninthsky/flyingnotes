const router = require('express').Router()

const {
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} = require('../controllers/users')

/* REGISTER */
router.post('/register', registerUser)

/* LOGIN */
router.post('/login', loginUser)

/* UPDATE */
router.put('/register', updateUser)

/* LOGOUT */
router.post('/logout', logoutUser)

module.exports = router
