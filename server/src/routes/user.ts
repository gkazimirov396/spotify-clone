import { Router } from 'express';

import { protectedRoute } from '../middleware/auth';

import userController from '../controllers/userController';

const router = Router();

router.use(protectedRoute);

router.get('/', userController.getAllUsers);

router.get('/messages/:userId', userController.getMessages);

export default router;
