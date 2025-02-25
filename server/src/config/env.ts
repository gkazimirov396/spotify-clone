import 'dotenv/config';

import { z } from 'zod';

const EnvSchema = z.object({
  ADMIN_EMAIL: z.string().email(),
  PORT: z.coerce.number().int().gte(80),
  NODE_ENV: z.enum(['production', 'development']).default('development'),

  MONGO_URI: z.string().startsWith('mongodb+srv://').includes('.mongodb.net'),

  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),

  CLERK_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  CLERK_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
});

export const env = EnvSchema.parse(process.env);
