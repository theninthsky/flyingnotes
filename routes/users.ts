import express from 'express';

import { registerUser, loginUser, updateUser } from '../controllers/users';

const router = express.Router();

/* REGISTER */
router.post('/register', registerUser);

/* LOGIN */
router.post('/login', loginUser);

/* UPDATE */
router.put('/register', updateUser);

export default router;