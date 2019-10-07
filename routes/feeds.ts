import express, { Request, Response } from 'express';

import Feed from '../models/feed.model';

const router = express.Router();

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
    Feed.findOneAndUpdate({_id: req.body.feedId}, req.body, {new: true})
        .then(feed => res.json(feed))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

export default router;