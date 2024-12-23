import { createServer } from 'node:http';

import { Server } from 'socket.io';

import { Message } from '../models/Message';

import type {
  Activities,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socket';

type HTTPServer = ReturnType<typeof createServer>;

export const initializeSocket = (server: HTTPServer) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  const userSockets = new Map<string, string>();
  const userActivities = new Map<string, Activities>();

  io.on('connection', socket => {
    socket.on('user_connected', userId => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, 'Idle');

      io.emit('user_connected', userId);

      socket.emit('users_online', Array.from(userSockets.keys()));

      io.emit('activities', Array.from(userActivities.entries()));
    });

    socket.on('update_activity', ({ userId, activity }) => {
      console.log('activity updated', userId, activity);

      userActivities.set(userId, activity);
      io.emit('activity_updated', { userId, activity });
    });

    socket.on('send_message', async data => {
      try {
        const { senderId, receiverId, content } = data;

        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', message);
        }

        socket.emit('message_sent', message);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Message error:', error);

          socket.emit('message_error', error.message);
        }
      }
    });

    socket.on('disconnect', () => {
      let disconnectedUserId: string | undefined;

      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;

          userSockets.delete(userId);
          userActivities.delete(userId);

          break;
        }
      }

      if (disconnectedUserId) {
        io.emit('user_disconnected', disconnectedUserId);
      }
    });
  });
};
