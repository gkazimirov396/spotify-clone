import { User } from '../models/User';

import type { NewUser } from '../schema/NewUser';

import type { RequestHandlerWithBody } from '../types/request-handler';

const authCallback: RequestHandlerWithBody<NewUser> = async (
  req,
  res,
  next
) => {
  const { id, userName, imageUrl } = req.body;

  try {
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      await User.create({
        clerkId: id,
        userName,
        imageUrl,
      });
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.log('Error in auth callback');

    next(error);
  }
};

export { authCallback };
