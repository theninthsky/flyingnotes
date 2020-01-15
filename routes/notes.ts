import express from 'express'

import { createNote, getNotes, updateNote, deleteNote } from '../controllers/notes'

const router = express.Router()

/* CREATE */
router.post('/notes', createNote)

/* READ */
router.get('/notes', getNotes)

/* UPDATE */
router.put('/notes', updateNote)

/* DELETE */
router.delete('/notes', deleteNote)

export default router