import express from 'express'

import { getFile, deleteFile } from '../controllers/files'

const router = express.Router()

/* READ FILE */
router.get('/:noteId/file', getFile)

/* DELETE FILE -- NOT IMPLEMENTED YET */
router.delete('/file', deleteFile)

export default router
