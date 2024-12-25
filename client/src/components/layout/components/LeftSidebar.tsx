import { Link } from 'react-router-dom';
import { SignedIn } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { HomeIcon, Library, MessageCircle } from 'lucide-react';

import albumService from '@/services/album';

import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import PlaylistSkeleton from '@/components/skeletons/PlaylistSkeleton';

import { RoutePath } from '@/router/path';

import { cn } from '@/lib/utils';

export default function LeftSidebar() {
  const { data: albums, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: albumService.getAlbums,
  });

  return (
    <aside className="flex flex-col h-full gap-2">
      <div className="p-4 rounded-lg bg-zinc-900">
        <div className="space-y-2">
          <Link
            to={RoutePath.HOME}
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'w-full justify-start text-white hover:bg-zinc-800',
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to={RoutePath.CHAT}
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className:
                    'w-full justify-start text-white hover:bg-zinc-800',
                })
              )}
            >
              <MessageCircle className="mr-2 size-5" />

              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      <div className="flex-1 p-4 rounded-lg bg-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center px-2 text-white">
            <Library className="mr-2 size-5" />

            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums?.map(album => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-zinc-800 group"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="flex-shrink-0 object-cover rounded-md size-12"
                  />

                  <div className="flex-1 hidden min-w-0 md:block">
                    <p className="font-medium truncate">{album.title}</p>

                    <p className="text-sm truncate text-zinc-400">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
