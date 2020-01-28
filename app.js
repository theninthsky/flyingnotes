const join = require('path').join
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

const userRoutes = require('./routes/users')
const noteRoutes = require('./routes/notes')
const fileRoutes = require('./routes/files')

require('dotenv').config()

const {
  NODE_ENV,
  MONGODB_URI,
  SESSION_SECRET,
  SESSION_LIFETIME = 1000 * 3600 * 24 * 365
} = process.env

const app = express()

if (NODE_ENV != 'test') {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err))
}

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.json({ limit: 1024 * 1024 * 2.5 })) // 2.5MB

app.use(
  session({
    cookie: { maxAge: +SESSION_LIFETIME, sameSite: true },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(userRoutes)
app.use(noteRoutes)
app.use(fileRoutes)
app.use((_, res) =>
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
)

module.exports = app
