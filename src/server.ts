import express, { Response } from 'express';
// import rssParser from 'rss-parser';
import mongoose from 'mongoose';
const app = express();

// mongoose.connect('mongodb+srv://almogg:88704261Aa@cluster0-dym66.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
//     .then(() => console.log('MongoDB is Connected...'))
//     .catch(err => console.log(err));

app.get('*', (_, res: Response) => res.send('Root Route!'));

app.listen(+process.env.PORT || 3000, process.env.IP, () => {
    console.log('Server is running on PORT 3000...');
});