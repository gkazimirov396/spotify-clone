import { Router } from 'express';

import { adminRoute, protectedRoute } from '../middleware/auth';

import { getStats } from '../controllers/statsController';

const router = Router();

router.get('/', protectedRoute, adminRoute, getStats);

export default router;
