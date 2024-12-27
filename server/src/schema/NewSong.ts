import { z } from 'zod';

import { Song } from '../models/Song';

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
  duration: z.coerce.number().gte(10),
  albumId: ValidMongoId.optional(),
});

export type NewSong = z.infer<typeof NewSongSchema>;
