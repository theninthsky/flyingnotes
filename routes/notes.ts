import express from 'express'

import { createNote, getNotes, getFile, updateNote, deleteNote } from '../controllers/notes'

const router = express.Router()

/* CREATE */
router.post('/notes', createNote)

/* READ */
router.get('/notes', getNotes)

/* READ FILE */
router.get('/:noteId/file', getFile)

/* UPDATE */
router.put('/notes', updateNote)

/* DELETE */
router.delete('/notes', deleteNote)

export default router