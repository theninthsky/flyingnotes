import http from 'http';
import { join } from 'path';
import express, { Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

require('dotenv').config();

import userRoutes from './routes/users';
import noteRoutes from './routes/notes';

const app = express();

app.use(express.static(join(__dirname, '..', 'client', 'build')));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

app.use(userRoutes);
app.use(noteRoutes);
app.use((_, res: Response) => res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html')));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});

/* Keep Heroku App Awake */
setInterval(() => http.get(process.env.HEROKUAPP_URL), 900000);