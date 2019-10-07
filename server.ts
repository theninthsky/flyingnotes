import express, { Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';
// import rssParser from 'rss-parser';

import userRoutes from './routes/users';
import noteRoutes from './routes/notes';
import feedRoutes from './routes/feeds';

require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

app.use(userRoutes);
app.use(noteRoutes);
app.use(feedRoutes);
app.get('*', (_, res: Response) => res.send('Root Route!'));

const { eth0, wlp1s0 } = os.networkInterfaces();
const ipAddress = eth0 ? eth0[0].address : wlp1s0 ? wlp1s0[0].address : '';

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${ipAddress}:${process.env.PORT}...`);
});