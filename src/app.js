import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import cors from './middleware/cors.js'
import validateToken from './middleware/jwt.js'

import * as userController from './controllers/user.js'
import * as notesController from './controllers/notes.js'
import * as filesController from './controllers/files.js'

const { NODE_ENV, MONGODB_URI = 'mongodb://localhost/main' } = process.env

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(`${__dirname}/client/build`))
app.use(express.json())
app.use(multer({ limits: { fileSize: 1024 * 1024 * 10 } }).single('file'))

const mongooseOpts = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

if (NODE_ENV != 'test') {
  mongoose
    .connect(MONGODB_URI, mongooseOpts)
    .then(() => console.log(`[Worker ${process.pid}] MongoDB is connected...`))
    .catch(err => console.error(err))
} else {
  import('mongodb-memory-server').then(({ default: { MongoMemoryServer } }) => {
    const mongoServer = new MongoMemoryServer()

    mongoServer.getUri().then(mongoURI => {
      mongoose
        .connect(mongoURI, mongooseOpts)
        .then(() => console.log('MongoDB Memory Server is connected...'))
        .catch(err => console.error(err))
    })
  })
}

if (NODE_ENV != 'production') {
  app.use(cors)

  if (NODE_ENV == 'test') {
    process.on('exit', () => console.log(`Test server successfully terminated`))

    app.use('/kill', (_, res) => {
      res.sendStatus(200)
      process.exit()
    })
  }
}

app.use(validateToken)

/* User Routes */
app.post('/register', userController.registerUser)
app.post('/login', userController.loginUser)
app.put('/register', userController.updateUser)
app.post('/logout', userController.logoutUser)

/* Notes Routes */
app.get('/notes', notesController.getNotes)
app.post('/notes', notesController.createNote)
app.put('/notes', notesController.updateNote)
app.delete('/notes', notesController.deleteNote)

/* Files Routes */
app.get('/:noteID/file', filesController.getFile)

/* Default Route */
app.use((_, res) => res.sendFile(`${__dirname}/client/build/index.html`))

export default app
