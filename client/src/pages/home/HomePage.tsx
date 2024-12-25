import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { usePlayerStore } from '@/store/player';

import songService from '@/services/song';

import TopBar from '@/components/TopBar';
import SectionGrid from './components/SectionGrid';
import FeaturedSection from './components/FeaturedSection';

import { ScrollArea } from '@/components/ui/scroll-area';

import type { Song } from '@/types';

export default function HomePage() {
  const queryClient = useQueryClient();

  const { data: madeForYouSongs, isLoading: madeForYouLoading } = useQuery({
    queryKey: ['songs', 'made-for-you'],
    queryFn: songService.getMadeForYouSongs,
  });

  const { data: trendingSongs, isLoading: trendingLoading } = useQuery({
    queryKey: ['songs', 'trending'],
    queryFn: songService.getTrendingSongs,
  });

  const initializeQueue = usePlayerStore(state => state.initializeQueue);

  useEffect(() => {
    const featuredSongs = queryClient.getQueryData<Song[]>([
      'songs',
      'featured',
    ]);

    if (
      madeForYouSongs?.length &&
      featuredSongs?.length &&
      trendingSongs?.length
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];

      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, queryClient]);

  return (
    <section className="h-full overflow-hidden rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
            Good afternoon
          </h1>

          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={madeForYouLoading}
            />

            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={trendingLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}
