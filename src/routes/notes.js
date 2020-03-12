const router = require('express').Router()

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote
} = require('../controllers/notes')

/* CREATE */
router.post('/notes', createNote)

/* READ */
router.get('/notes', getNotes)

/* UPDATE */
router.put('/notes', updateNote)

/* DELETE */
router.delete('/notes', deleteNote)

module.exports = router
