import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { io, type Socket } from 'socket.io-client';

import axios from '@/lib/axios';

import type { Message, User } from '@/types';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@/types/socket';

const baseURL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/';

const initialSelectedUser = sessionStorage.getItem('selected-user')
  ? (JSON.parse(sessionStorage.getItem('selected-user')!) as User)
  : null;

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create(
  combine(
    {
      socket,
      isConnected: false,
      onlineUsers: new Set<string>(),
      userActivities: new Map<string, string>(),
      messages: [] as Message[],
      selectedUser: initialSelectedUser,
      isLoading: false,
      error: null,
    },
    (set, get) => ({
      setSelectedUser: (user: User | null) => {
        set({ selectedUser: user });

        if (!user) return sessionStorage.removeItem('selected-user');

        sessionStorage.setItem('selected-user', JSON.stringify(user));
      },

      initSocket: (userId: string) => {
        if (!get().isConnected) {
          socket.auth = { userId };
          socket.connect();

          socket.emit('user_connected', userId);

          socket.on('users_online', users => {
            set({ onlineUsers: new Set(users) });
          });

          socket.on('activities', activities => {
            set({ userActivities: new Map(activities) });
          });

          socket.on('user_connected', userId => {
            set(state => ({
              onlineUsers: new Set([...state.onlineUsers, userId]),
            }));
          });

          socket.on('user_disconnected', userId => {
            set(state => {
              const newOnlineUsers = new Set(state.onlineUsers);
              newOnlineUsers.delete(userId);

              return { onlineUsers: newOnlineUsers };
            });
          });

          socket.on('receive_message', message => {
            set(state => ({
              messages: [...state.messages, message],
            }));
          });

          socket.on('message_sent', message => {
            set(state => ({
              messages: [...state.messages, message],
            }));
          });

          socket.on('activity_updated', ({ userId, activity }) => {
            set(state => {
              const newActivities = new Map(state.userActivities);
              newActivities.set(userId, activity);

              return { userActivities: newActivities };
            });
          });

          set({ isConnected: true });
        }
      },

      disconnectSocket: () => {
        if (get().isConnected) {
          socket.disconnect();

          set({ isConnected: false });
        }
      },

      sendMessage: (receiverId: string, senderId: string, content: string) => {
        const socket = get().socket;
        if (!socket) return;

        socket.emit('send_message', { receiverId, senderId, content });

        socket.once('message_error', error => toast.error(error));
      },

      fetchMessages: async (userId: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.get<Message[]>(
            `/users/messages/${userId}`
          );

          set({ messages: response.data });
        } catch (error) {
          if (error instanceof AxiosError) {
            set({ error: error.response?.data.message });
          }
        } finally {
          set({ isLoading: false });
        }
      },
    })
  )
);
