import Express, { Router } from 'express';
import { addTask, getTasks } from '../controllers/taskController.ts';
import Cors from 'cors';


const router: Router = Express.Router();


router.get('/:userId', getTasks);
router.post('/:userId', addTask);

export default router;
