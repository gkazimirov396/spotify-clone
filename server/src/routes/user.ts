import { Router } from 'express';
import { z } from 'zod';

import { protectedRoute } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

import userController from '../controllers/userController';

import { ValidMongoId } from '../schema/MongoId';

const router = Router();

router.use(protectedRoute);

router.get('/', userController.getAllUsers);

router.get(
  '/messages/:userId',
  validateRequest({ params: z.object({ userId: ValidMongoId }) }),
  userController.getMessages
);

export default router;
