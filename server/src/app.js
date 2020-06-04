import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import redis from 'redis'
import connectRedis from 'connect-redis'
import multer from 'multer'
import helmet from 'helmet'

import auth from './middleware/auth.js'
import cors from './middleware/cors.js'

import * as userController from './controllers/user.js'
import * as notesController from './controllers/notes.js'
import * as filesController from './controllers/files.js'

const {
  NODE_ENV,
  MONGODB_URI = 'mongodb://localhost/main',
  REDIS_URI,
  REDIS_PASSWORD,
  SESSION_SECRET,
  SESSION_LIFETIME = 1000 * 3600 * 24 * 365,
} = process.env

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const RedisStore = connectRedis(session)
export const redisClient = redis.createClient(REDIS_URI)

app.use(express.static(join(__dirname, '..', '..', 'client', 'build')))
app.use(express.json())
app.use(multer({ limits: { fileSize: 1024 * 1024 * 10 } }).single('file'))
app.use(helmet())

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
    .catch(({ message }) => console.error(`Error: ${message}`))
} else {
  import('mongodb-memory-server').then(({ default: { MongoMemoryServer } }) => {
    const mongoServer = new MongoMemoryServer()

    mongoServer.getUri().then(mongoURI => {
      mongoose
        .connect(mongoURI, mongooseOpts)
        .then(() => console.log('MongoDB Memory Server is connected...'))
        .catch(({ message }) => console.error(`Error: ${message}`))
    })
  })
}

redisClient.auth(REDIS_PASSWORD)
redisClient.on('connect', () => {
  console.log(`[Worker ${process.pid}] Redis is connected...`)
})
redisClient.on('error', ({ message }) => console.error(`Error: ${message}`))

// redisClient.monitor((err, res) => {
//   console.log('Redis: Entering monitoring mode.')
// })

// redisClient.on('monitor', (time, args, rawReply) => {
//   console.log(args)
// })

app.use(
  session({
    cookie: { maxAge: +SESSION_LIFETIME, sameSite: true },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient, disableTouch: true }),
  }),
)

app.use(auth)

if (NODE_ENV != 'production') app.use(cors)

/* User Routes */
app.post('/register', userController.registerUser)
app.post('/login', userController.loginUser)
app.put('/update', userController.updateUser)
app.put('/register', userController.changePassword)
app.post('/logout', userController.logoutUser)

/* Notes Routes */
app.get('/notes', notesController.getNotes)
app.post('/notes', notesController.createNote)
app.put('/notes', notesController.updateNote)
app.delete('/notes', notesController.deleteNote)

/* Files Routes */
app.get('/:noteID/file', filesController.getFile)

/* Default Route */
app.use((_, res) => {
  res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'))
})

export default app
