import express from 'express'
import session from 'express-session'
import multer from 'multer'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'

require('dotenv').config()

import * as userController from './controllers/user'
import * as notesController from './controllers/notes'
import * as filesController from './controllers/files'

const {
  NODE_ENV,
  MONGODB_URI = 'mongodb://localhost/main',
  SESSION_SECRET = 'keyboard cat',
  SESSION_LIFETIME = 1000 * 3600 * 24 * 365,
  CLIENT_PORT = 3000,
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
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err))
} else {
  // @ts-ignore
  import('mongodb-memory-server').then(({ MongoMemoryServer }) => {
    const mongoServer = new MongoMemoryServer()

    mongoServer.getUri().then((mongoURI: string) => {
      mongoose
        .connect(mongoURI, mongooseOpts)
        .then(() => console.log('MongoDB Memory Server is connected...'))
        .catch(err => console.log(err))
    })
  })
}

app.use(express.static(`${__dirname}/client/build`))
app.use(express.json())
app.use(multer({ limits: { fileSize: 1024 * 1024 * 2.5 } }).single('file'))

app.use(
  session({
    cookie: { maxAge: +SESSION_LIFETIME, sameSite: true },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
)

app.use((_, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    `http://localhost:${CLIENT_PORT}`,
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  next()
})

if (NODE_ENV == 'test') {
  app.use('/kill', (_, res) => {
    res.sendStatus(200)
    process.exit()
  })
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

/* File Routes */
app.get('/:noteId/file', filesController.getFile)

app.use((_, res) => res.sendFile(`${__dirname}/client/build/index.html`))

export default app
