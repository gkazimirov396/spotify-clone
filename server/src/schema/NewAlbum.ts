import { z } from 'zod';

import { Album } from '../models/Album';

import { CURRENT_YEAR } from '../utils/constants';

export const NewAlbumSchema = z.object({
  title: z
    .string()
    .min(2)
    .refine(
      async title => {
        const album = await Album.findOne({ title });

        return album === null;
      },
      { message: 'Album with that title already exists!' }
    ),
  artist: z.string().min(2),
  releaseYear: z.coerce.number().int().min(1889).max(CURRENT_YEAR),
});

export type NewAlbum = z.infer<typeof NewAlbumSchema>;
