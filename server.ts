import express, { Response } from 'express';
import mongoose from 'mongoose';
// import rssParser from 'rss-parser';

import userRoutes from './routes/users';
import noteRoutes from './routes/notes';
import feedRoutes from './routes/feeds';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

app.use(userRoutes);
app.use(noteRoutes);
app.use(feedRoutes);
app.get('*', (_, res: Response) => res.send('Root Route!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});