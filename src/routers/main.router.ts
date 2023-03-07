import { Request, Response, Router } from 'express';
import { UrlData } from '../@types/types';
import { addUrl, checkUrl, validateInputs } from '../controllers/redirectUrl.controller';
import Url from '../Schemas/Url';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log(`${req.protocol}://${req.headers.host}`);
    
    res.render('index', { page: "Homepage", title: "S-URLShortner" });
});

router.get('/:id', checkUrl, async (req: Request, res: Response) => {
    const { id } = req.params;
    const getUrl: UrlData | null = await Url.findOne({ urlId: id });
    if(!getUrl) return res.render('error', { title: "" });
    res.redirect(getUrl!.url);
});

router.post('/shorten', validateInputs, addUrl);

export default router;