import { Router } from 'express';

import { protectedRoute, adminRoute } from '../middleware/auth';

import songController from '../controllers/songController';

const router = Router();

router.get('/', protectedRoute, adminRoute, songController.getAllSongs);

router.get('/featured', songController.getFeaturedSongs);

router.get('/trending', songController.getTrendingSongs);

router.get('/made-for-you', songController.getMadeForYouSongs);

export default router;
