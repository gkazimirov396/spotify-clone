import { z } from 'zod';

import { Song } from '../models/Song';
import { Album } from '../models/Album';

import { ValidMongoId } from './MongoId';

export const NewSongSchema = z.object({
  title: z
    .string()
    .min(2)
    .refine(
      async title => {
        const song = await Song.findOne({ title });

        return song === null;
      },
      { message: 'Song with that title already exists!' }
    ),
  artist: z.string().min(2),
  duration: z.coerce.number().gte(7),
  albumId: ValidMongoId.optional().refine(
    async albumId => {
      if (albumId) {
        const album = await Album.findById(albumId);

        return album !== null;
      }

      return true;
    },
    { message: 'Album, you are trying to add the song to, does not exist!' }
  ),
});

export type NewSong = z.infer<typeof NewSongSchema>;
