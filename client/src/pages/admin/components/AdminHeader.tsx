import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

import { RoutePath } from '@/router/path';

import spotifyLogo from '@/assets/images/spotify.png';

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link to={RoutePath.HOME} className="rounded-lg">
          <img src={spotifyLogo} className="text-black size-10" />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="mt-1 text-zinc-400">Manage your music catalog</p>
        </div>
      </div>

      <UserButton />
    </header>
  );
}
