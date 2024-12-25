import { z } from 'zod';

import { CURRENT_YEAR } from '../utils/constants';

export const NewAlbumSchema = z.object({
  title: z.string().min(2),
  artist: z.string().min(2),
  releaseYear: z.coerce.number().int().min(1889).max(CURRENT_YEAR),
});

export type NewAlbum = z.infer<typeof NewAlbumSchema>;
