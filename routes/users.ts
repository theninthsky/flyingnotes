import express from 'express'

import {
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from '../controllers/users'

const router = express.Router()

/* REGISTER */
router.post('/register', registerUser)

/* LOGIN */
router.post('/login', loginUser)

/* UPDATE */
router.put('/register', updateUser)

/* LOGOUT */
router.post('/logout', logoutUser)

export default router
