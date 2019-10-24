import express, { Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import noteRoutes from './routes/notes';

require('dotenv').config();

const app = express();

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
app.get('*', (_, res: Response) => res.send('Root Route!'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});