import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import multer from 'multer'

require('dotenv').config()

import cors from './config/cors'

import * as userController from './controllers/user'
import * as notesController from './controllers/notes'
import * as filesController from './controllers/files'

const {
  NODE_ENV,
  MONGODB_URI = 'mongodb://localhost/main',
  SESSION_SECRET = 'keyboard cat',
  SESSION_LIFETIME = 1000 * 3600 * 24 * 365,
} = process.env

const MongoStore = connectMongo(session)

const app = express()

const mongooseOpts = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

if (NODE_ENV != 'test') {
  mongoose
    .connect(MONGODB_URI, mongooseOpts)
    .then(() => console.log(`[worker ${process.pid}] MongoDB is connected...`))
    .catch(err => console.log(err))
} else {
  import('mongodb-memory-server').then(({ MongoMemoryServer }) => {
    const mongoServer = new MongoMemoryServer()

    mongoServer.getUri().then(mongoURI => {
      mongoose
        .connect(mongoURI, mongooseOpts)
        .then(() => console.log('MongoDB Memory Server is connected...'))
        .catch(err => console.log(err))
    })
  })
}

app.use(express.static(`${__dirname}/client/build`))
app.use(express.json())
app.use(multer({ limits: { fileSize: 1024 * 1024 * 2 } }).single('file'))

app.use(
  session({
    cookie: { maxAge: +SESSION_LIFETIME, sameSite: true },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
)

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
app.get('/:noteId/file', filesController.getFile)

app.use((_, res) => res.sendFile(`${__dirname}/client/build/index.html`))

export default app
