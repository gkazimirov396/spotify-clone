import { Pause, Play } from 'lucide-react';

import { usePlayerStore } from '@/store/player';

import { Button } from '@/components/ui/button';

import type { Song } from '@/types';

export default function PlayButton({ song }: { song: Song }) {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="text-black size-5" />
      ) : (
        <Play className="text-black size-5" />
      )}
    </Button>
  );
}
