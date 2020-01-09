import express from 'express'

import { createNote, getNotes, updateNote, deleteNote } from '../controllers/notes'

const router = express.Router()

/* CREATE */
router.post('/:userId/notes', createNote)

/* READ */
router.get('/:userId/notes', getNotes)

/* UPDATE */
router.put('/:userId/notes', updateNote)

/* DELETE */
router.delete('/:userId/notes', deleteNote)

export default router