import Express, { Router } from 'express';
import { getUserIdByEmail, login, register } from '../controllers/authController.ts';
const router: Router = Express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/userId', getUserIdByEmail);

export default router;
