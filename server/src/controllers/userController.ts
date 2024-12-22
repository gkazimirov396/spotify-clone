import type { RequestHandler } from 'express';
import { getAuth } from '@clerk/express';

import { Message } from '../models/Message';
import { User } from '../models/User';

import type { RequestHandlerWithDynamicId } from '../types/request-handler';

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const currentUserId = auth.userId;

    const users = await User.find({ clerkId: { $ne: currentUserId } });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getMessages: RequestHandlerWithDynamicId<'userId'> = async (
  req,
  res,
  next
) => {
  const { userId } = req.params;

  try {
    const auth = getAuth(req);
    const currentUserId = auth.userId;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: currentUserId },
        { senderId: currentUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export default { getAllUsers, getMessages };
