import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import songService from '@/services/song';

import PlayButton from './PlayButton';

import FeaturedGridSkeleton from '@/components/skeletons/FeaturedGridSkeleton';

import type { Song } from '@/types';

export default function FeaturedSection() {
  const {
    data: featuredSongs,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery<Song[], AxiosError>({
    queryKey: ['songs', 'featured'],
    queryFn: songService.getFeaturedSongs,
  });

  if (isLoading) return <FeaturedGridSkeleton />;

  if (isError)
    return <p className="mb-4 text-lg text-red-500">{error.message}</p>;

  return (
    <ul className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3">
      {isSuccess &&
        featuredSongs.map(song => (
          <li
            key={song._id}
            className="relative flex items-center overflow-hidden transition-colors rounded-md cursor-pointer bg-zinc-800/50 hover:bg-zinc-700/50 group"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="flex-shrink-0 object-cover w-16 h-16 sm:w-20 sm:h-20"
            />

            <div className="flex-1 p-4">
              <p className="font-medium truncate">{song.title}</p>
              <p className="text-sm truncate text-zinc-400">{song.artist}</p>
            </div>

            <PlayButton song={song} />
          </li>
        ))}
    </ul>
  );
}
