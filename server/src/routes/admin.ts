import { Router } from 'express';

import { validateRequest } from '../middleware/validation';
import { protectedRoute, adminRoute } from '../middleware/auth';

import adminController from '../controllers/adminController';

import { MongoIdSchema } from '../schema/MongoId';
import { NewSongSchema } from '../schema/NewSong';
import { NewAlbumSchema } from '../schema/NewAlbum';

const router = Router();

router.use(protectedRoute, adminRoute);

router.get('/check', adminController.checkAdmin);

router.post(
  '/songs',
  validateRequest({ body: NewSongSchema }),
  adminController.createSong
);
router.delete(
  '/songs/:id',
  validateRequest({ params: MongoIdSchema }),
  adminController.deleteSong
);

router.post(
  '/albums',
  validateRequest({ body: NewAlbumSchema }),
  adminController.createAlbum
);
router.delete(
  '/albums/:id',
  validateRequest({ params: MongoIdSchema }),
  adminController.deleteAlbum
);

export default router;
