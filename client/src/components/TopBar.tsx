import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { dark } from '@clerk/themes';

import authService from '@/services/auth';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

import SignInButtons from './SignInButtons';

import { RoutePath } from '@/router/path';

import spotifyLogo from '@/assets/images/spotify.png';

export default function TopBar() {
  const { data: isAdmin } = useQuery<boolean>({
    queryKey: ['admin', 'status'],
    queryFn: authService.checkAdminStatus,
  });

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-md ">
      <div className="flex items-center gap-2">
        <img src={spotifyLogo} className="size-8" alt="Spotify logo" />
        Spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={RoutePath.ADMIN}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <LayoutDashboardIcon className="mr-2 size-4" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInButtons />
        </SignedOut>

        <UserButton appearance={{ baseTheme: dark }} />
      </div>
    </header>
  );
}
