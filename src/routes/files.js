const router = require('express').Router()

const { getFile } = require('../controllers/files')

/* READ FILE */
router.get('/:noteId/file', getFile)

module.exports = router
