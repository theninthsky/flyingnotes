import { Request, Response } from 'express'

import File from '../models/file.model'

export const getFile = (req: Request, res: Response) => {
  File.findOne({ noteId: req.params.noteId })
    .then(({ base64 }) => res.json({ file: base64 }))
    .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg))
}

export const deleteFile = (req: Request, res: Response) => {
  File.findOneAndDelete({ noteId: req.body.noteId }).then(() =>
    res.sendStatus(200)
  )
}
