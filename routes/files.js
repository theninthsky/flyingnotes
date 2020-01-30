const router = require('express').Router()

const { getFile, deleteFile } = require('../controllers/files')

/* READ FILE */
router.get('/:noteId/file', getFile)

/* DELETE FILE -- NOT YET IMPLEMENTED IN CLIENT */
router.delete('/:noteId/file', deleteFile)

module.exports = router
