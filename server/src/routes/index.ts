import { Router } from 'express';

import authRoutes from './auth';
import userRoutes from './user';
import songRoutes from './song';
import adminRoutes from './admin';
import statsRoutes from './stats';
import albumRoutes from './album';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/songs', songRoutes);
router.use('/admin', adminRoutes);
router.use('/stats', statsRoutes);
router.use('/albums', albumRoutes);

export default router;
