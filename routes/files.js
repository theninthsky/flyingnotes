const router = require('express').Router()

const { getFile, deleteFile } = require('../controllers/files')

/* READ FILE */
router.get('/:noteId/file', getFile)

/* DELETE FILE -- NOT IMPLEMENTED YET */
router.delete('/file', deleteFile)

module.exports = router
