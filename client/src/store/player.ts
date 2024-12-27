import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import get from 'just-safe-get';

import { useChatStore } from './chat';

import type { Song } from '@/types';

export const usePlayerStore = create(
  combine(
    {
      currentSong: null as Song | null,
      isPlaying: false,
      queue: [] as Song[],
      currentIndex: -1,
    },
    (set, getState) => ({
      initializeQueue: (songs: Song[]) => {
        set(state => ({
          queue: songs,
          currentSong: state.currentSong || songs[0],
          currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex,
        }));
      },

      playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const song = songs[startIndex];

        const socket = useChatStore.getState().socket;
        if (socket.auth) {
          socket.emit('update_activity', {
            userId: get(socket, 'auth.userId'),
            activity: `Playing ${song.title} by ${song.artist}`,
          });
        }

        set({
          queue: songs,
          currentSong: song,
          currentIndex: startIndex,
          isPlaying: true,
        });
      },

      setCurrentSong: (song: Song) => {
        if (!song) return;

        const socket = useChatStore.getState().socket;
        if (socket.auth) {
          socket.emit('update_activity', {
            userId: get(socket, 'auth.userId'),
            activity: `Playing ${song.title} by ${song.artist}`,
          });
        }

        const songIndex = getState().queue.findIndex(s => s._id === song._id);

        set({
          currentSong: song,
          isPlaying: true,
          currentIndex: songIndex !== -1 ? songIndex : getState().currentIndex,
        });
      },

      togglePlay: () => {
        const willStartPlaying = !getState().isPlaying;

        const currentSong = getState().currentSong;
        const socket = useChatStore.getState().socket;

        if (socket.auth) {
          socket.emit('update_activity', {
            userId: get(socket, 'auth.userId'),
            activity:
              willStartPlaying && currentSong
                ? `Playing ${currentSong.title} by ${currentSong.artist}`
                : 'Idle',
          });
        }

        set({
          isPlaying: willStartPlaying,
        });
      },

      playNext: () => {
        const { currentIndex, queue } = getState();
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
          const nextSong = queue[nextIndex];

          const socket = useChatStore.getState().socket;
          if (socket.auth) {
            socket.emit('update_activity', {
              userId: get(socket, 'auth.userId'),
              activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
            });
          }

          set({
            currentSong: nextSong,
            currentIndex: nextIndex,
            isPlaying: true,
          });
        } else {
          set({ isPlaying: false });

          const socket = useChatStore.getState().socket;
          if (socket.auth) {
            socket.emit('update_activity', {
              userId: get(socket, 'auth.userId'),
              activity: `Idle`,
            });
          }
        }
      },
      playPrevious: () => {
        const { currentIndex, queue } = getState();
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
          const prevSong = queue[prevIndex];

          const socket = useChatStore.getState().socket;
          if (socket.auth) {
            socket.emit('update_activity', {
              userId: get(socket, 'auth.userId'),
              activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
            });
          }

          set({
            currentSong: prevSong,
            currentIndex: prevIndex,
            isPlaying: true,
          });
        } else {
          set({ isPlaying: false });

          const socket = useChatStore.getState().socket;
          if (socket.auth) {
            socket.emit('update_activity', {
              userId: get(socket, 'auth.userId'),
              activity: `Idle`,
            });
          }
        }
      },
    })
  )
);
