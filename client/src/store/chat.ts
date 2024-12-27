import { create } from 'zustand';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { io, type Socket } from 'socket.io-client';

import axios from '@/lib/axios';

import type { Message, User } from '@/types';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@/types/socket';

interface ChatStore {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  selectedUser: User | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;

  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  setSelectedUser: (user: User | null) => void;
  fetchMessages: (userId: string) => Promise<void>;
}

const baseURL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/';

const initialSelectedUser = localStorage.getItem('selected-user')
  ? (JSON.parse(localStorage.getItem('selected-user')!) as User)
  : null;

const socket: ChatStore['socket'] = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: initialSelectedUser,
  isLoading: false,
  error: null,

  setSelectedUser: user => {
    set({ selectedUser: user });

    localStorage.setItem('selected-user', JSON.stringify(user));
  },

  initSocket: userId => {
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

  sendMessage: (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit('send_message', { receiverId, senderId, content });

    socket.once('message_error', error => toast.error(error));
  },

  fetchMessages: async userId => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<Message[]>(`/users/messages/${userId}`);

      set({ messages: response.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
