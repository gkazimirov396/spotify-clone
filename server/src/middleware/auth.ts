import type { RequestHandler } from 'express';
import { getAuth, clerkClient } from '@clerk/express';

import { env } from '../config/env';

import { ServerError } from '../utils/ServerError';

// export const protectedRoute = requireAuth({ signInUrl: '/auth/callback' });

export const protectedRoute: RequestHandler = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      const error = new ServerError(401);

      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const adminRoute: RequestHandler = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    const currentUser = await clerkClient.users.getUser(auth.userId!);
    const isAdmin =
      env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      const error = new ServerError(403);

      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};
