import { z } from 'zod';

import { ValidMongoId } from './MongoId';

export const NewSongSchema = z.object({
  title: z.string().min(2),
  artist: z.string().min(2),
  duration: z.coerce.number().gte(0),
  albumId: ValidMongoId.optional(),
});

export type NewSong = z.infer<typeof NewSongSchema>;
