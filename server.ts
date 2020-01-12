import http from 'http'
import { join } from 'path'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'

import userRoutes from './routes/users'
import noteRoutes from './routes/notes'

require('dotenv').config()

const {
    PORT = 5000,
    MONGODB_URI,
    SESSION_SECRET,
    SESSION_LIFETIME = 1000 * 3600 * 24 * 365,
    HEROKUAPP_URL
} = process.env

const app = express()

const MongoStore = connectMongo(session)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err))

app.use(express.static(join(__dirname, '..', 'client', 'build')))
app.use(express.json({ limit: '2621440' })) // 2.5MB

app.use(session({
    cookie: { maxAge: +SESSION_LIFETIME, sameSite: true },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
    next()
});

app.use(userRoutes)
app.use(noteRoutes)
app.use((_, res) => res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html')))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

/* Keep Heroku App Awake */
setInterval(() => http.get(HEROKUAPP_URL), 900000)