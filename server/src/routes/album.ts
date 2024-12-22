import { Router } from 'express';

import { validateRequest } from '../middleware/validation';

import albumController from '../controllers/albumController';

import { MongoIdSchema } from '../schema/MongoId';

const router = Router();

router.get('/', albumController.getAllAlbums);

router.get(
  '/:id',
  validateRequest({ params: MongoIdSchema }),
  albumController.getAlbumById
);

export default router;
