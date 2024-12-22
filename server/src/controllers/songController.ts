import type { RequestHandler } from 'express';

import { type ISong, Song } from '../models/Song';

import type { WithMongoId } from '../types/util';

type AggregatedSongs = Omit<WithMongoId<ISong>, 'albumId' | 'duration'>;

const getAllSongs: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ recordedAt: -1 });

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

const getFeaturedSongs: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.aggregate<AggregatedSongs>([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

const getMadeForYouSongs: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.aggregate<AggregatedSongs>([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

const getTrendingSongs: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.aggregate<AggregatedSongs>([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
};
