import express, { Request, Response } from 'express';
import RSSParser from 'rss-parser';

import Feed from '../models/feed.model';

const router = express.Router();
const parser = new RSSParser();

/* CREATE */
router.post('/feeds', (req: Request, res: Response) => {
    const { userId, name, url } = req.body;
    const newFeed = new Feed({ userId, name, url });

    newFeed.save()
        .then(feed => res.json(feed))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* UPDATE */
router.put('/feeds', (req: Request, res: Response) => {
    Feed.findByIdAndUpdate(req.body.feedId, req.body, { new: true, runValidators: true })
        .then(feed => res.json(feed))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* DELETE */
router.delete('/feeds', (req: Request, res: Response) => {
    Feed.findByIdAndDelete(req.body.feedId)
        .then(() => res.send('DELETED'))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

/* PROXY */
router.get('/fetch-rss/*', (req: Request, res: Response) => {
    parser.parseURL(req.params[0])
        .then(data => res.send(data))
        .catch(() => res.send(`No response from ${req.params[0]}, make sure the URL is typed correctly.`));
});

export default router;