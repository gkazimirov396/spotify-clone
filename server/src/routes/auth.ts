import { Router } from 'express';

import { validateRequest } from '../middleware/validation';

import { authCallback } from '../controllers/authController';

import { NewUserSchema } from '../schema/NewUser';

const router = Router();

router.post(
  '/callback',
  validateRequest({ body: NewUserSchema }),
  authCallback
);

export default router;
