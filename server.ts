import express, { Response } from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import noteRoutes from './routes/notes';
import feedRoutes from './routes/feeds';

require('dotenv').config();

const app = express();

app.use(express.json());

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
app.use(feedRoutes);
app.get('*', (_, res: Response) => res.send('Root Route!'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});