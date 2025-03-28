import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, Pause, Play } from 'lucide-react';

import { usePlayerStore } from '@/store/player';

import albumService from '@/services/album';

import SongItem from './components/SongItem';

import { ScrollArea } from '@/components/ui/scroll-area';
import LoaderElement from '@/components/LoaderElement';
import { Button } from '@/components/ui/button';

export default function AlbumPage() {
  const { albumId } = useParams();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const { data: currentAlbum, isLoading } = useQuery({
    queryKey: ['albums', albumId],
    queryFn: () => albumService.getAlbumById(albumId!),
    enabled: !!albumId,
  });

  if (isLoading) return <LoaderElement />;

  const isCurrentAlbumPlaying = currentAlbum?.songs.some(
    song => song._id === currentSong?._id
  );

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    if (isCurrentAlbumPlaying) togglePlay();
    else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <section className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex gap-6 p-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />

              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>

                <h1 className="my-4 font-bold text-7xl">
                  {currentAlbum?.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>

                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 px-6 pb-4">
              <Button
                size="icon"
                onClick={handlePlayAlbum}
                className="transition-all bg-green-500 rounded-full w-14 h-14 hover:bg-green-400 hover:scale-105"
              >
                {isPlaying && isCurrentAlbumPlaying ? (
                  <Pause className="text-black h-7 w-7" />
                ) : (
                  <Play className="text-black h-7 w-7" />
                )}
              </Button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm">
              <div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5"
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div className="px-6">
                <ul className="py-4 space-y-2">
                  {currentAlbum?.songs.map((song, index) => {
                    return (
                      <SongItem
                        song={song}
                        index={index}
                        onPlaySong={handlePlaySong}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}
