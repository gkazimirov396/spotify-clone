import type { RequestHandler } from 'express';

import { Album } from '../models/Album';
import { Song } from '../models/Song';
import { User } from '../models/User';

export const getStats: RequestHandler = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: 'albums',
              pipeline: [],
            },
          },
          {
            $group: {
              _id: '$artist',
            },
          },
          {
            $count: 'count',
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
