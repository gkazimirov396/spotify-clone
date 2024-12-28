import { Play } from 'lucide-react';

import { usePlayerStore } from '@/store/player';

import { formatSongDuration } from '@/utils/time';

import type { Song } from '@/types';

interface SongItemProps {
  song: Song;
  index: number;
  onPlaySong: (index: number) => void;
}

export default function SongItem({ song, index, onPlaySong }: SongItemProps) {
  const currentSong = usePlayerStore(state => state.currentSong);
  const isPlaying = usePlayerStore(state => state.isPlaying);

  const isCurrentSong = currentSong?._id === song._id;

  return (
    <li
      key={song._id}
      tabIndex={0}
      onClick={() => onPlaySong(index)}
      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
    >
      <div className="flex items-center justify-center">
        {isCurrentSong && isPlaying ? (
          <div className="text-green-500 size-4">♫</div>
        ) : (
          <span className="group-hover:hidden">{index + 1}</span>
        )}

        {!isCurrentSong && (
          <Play className="hidden w-4 h-4 group-hover:block" />
        )}
      </div>

      <div className="flex items-center gap-3">
        <img
          src={song.imageUrl}
          alt={song.title}
          loading="lazy"
          className="size-10"
        />

        <div>
          <div className="font-medium text-white">{song.title}</div>

          <div>{song.artist}</div>
        </div>
      </div>
      <div className="flex items-center">{song.recordedAt.split('T')[0]}</div>

      <div className="flex items-center">
        {formatSongDuration(song.duration)}
      </div>
    </li>
  );
}
