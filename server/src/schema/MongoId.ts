import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

export const ValidMongoId = z.custom<string>(
  data => isValidObjectId(data),
  'Invalid id.'
);

export const MongoIdSchema = z.object({
  id: ValidMongoId,
});
