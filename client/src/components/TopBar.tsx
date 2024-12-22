import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

import SignInButtons from './SignInButtons';

import { buttonVariants } from './ui/button';

import spotifyLogo from '@/assets/spotify.png';

export default function TopBar() {
  const isAdmin = false; // TODO: Add react query

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-md ">
      <div className="flex items-center gap-2">
        <img src={spotifyLogo} className="size-8" alt="Spotify logo" />
        Spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <LayoutDashboardIcon className="mr-2 size-4" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
}
