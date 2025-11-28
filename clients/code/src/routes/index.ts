import Express, { Router } from 'express';
import { getOwner, getOwners, setOwner } from '../controllers/clientsController.js';
const router: Router = Express.Router();

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.json('hi');
//   next();
// });
router.get('/owners', getOwners);
router.post('/owners', setOwner);
router.get('/owners/:id', getOwner);

export default router;
