import express, { Response } from 'express';
// import rssParser from 'rss-parser';
import mongoose from 'mongoose';

import User from './models/user.model';
import Note from './models/note.model';
import Group from './models/group.model';
import Feed from './models/feed.model';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username: username, email: email, password: password });
    
    newUser.save()
        .then(() => console.log(username + ' registered!')) // might be more accurate to print the promise's responded username, but TS gives an error. ref: https://mongoosejs.com/docs/api/model.html#model_Model-save
        .catch(err => console.log(err));
});

app.get('*', (_, res: Response) => res.send('Root Route!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});