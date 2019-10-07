import express, { Request, Response } from 'express';

import Feed from '../models/feed.model';

const router = express.Router();

/* CREATE */
router.post('/feeds', (req: Request, res: Response) => {
    const { userId, name, url } = req.body;
    const newFeed = new Feed({ userId, name, url });

    newFeed.save()
        .then(() => Feed.find({userId: req.body.userId}))
        .then(feeds => res.json(feeds))
        .catch(({ message, errmsg }) => console.log('Error: ' + message || errmsg));
});

export default router;