import { z } from 'zod';

export const NewUserSchema = z.object({
  id: z.string().startsWith('user_'),
  imageUrl: z.string().url(),
  userName: z.string().min(2, 'Username should be at least 2 characters long!'),
});

export type NewUser = z.infer<typeof NewUserSchema>;
