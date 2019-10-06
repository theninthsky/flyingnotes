import express, { Request, Response } from 'express';

import Feed from '../models/feed.model';

const router = express.Router();

router.post('/feeds', (req: Request, res: Response) => {
    const { name, url } = req.body;
    const newFeed = new Feed({name, url});

    newFeed.save()
        .then(({name}) => console.log(name + ' feed added!'))
        .catch(({message, errmsg}) => console.log('Error: ' + message || errmsg));
});

export default router;