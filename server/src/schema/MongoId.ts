import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

export const ValidMongoId = z.custom<boolean>(
  data => isValidObjectId(data),
  'Invalid id.'
);

export const MongoIdSchema = z.object({
  id: ValidMongoId,
});
