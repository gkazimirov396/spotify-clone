import type { RequestHandler } from 'express';

import { Album } from '../models/Album';

import { ServerError } from '../utils/ServerError';

import type { RequestHandlerWithDynamicId } from '../types/request-handler';

const getAllAlbums: RequestHandler = async (req, res, next) => {
  try {
    const albums = await Album.find();

    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

const getAlbumById: RequestHandlerWithDynamicId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id).populate('songs');

    if (!album) {
      const error = new ServerError(404, 'Album with that id does not exist!');

      throw error;
    }

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

export default { getAlbumById, getAllAlbums };
