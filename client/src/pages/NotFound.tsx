import { useNavigate } from 'react-router-dom';
import { Home, Music2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { RoutePath } from '@/router/path';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center h-screen bg-neutral-900">
      <div className="px-4 space-y-8 text-center">
        <div className="flex justify-center animate-bounce">
          <Music2 className="w-24 h-24 text-emerald-500" />
        </div>

        <div className="space-y-4">
          <h1 className="font-bold text-white text-7xl">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page not found</h2>
          <p className="max-w-md mx-auto text-neutral-400">
            Looks like this track got lost in the shuffle. Let's get you back to
            the music.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full text-white bg-neutral-800 hover:bg-neutral-700 border-neutral-700 sm:w-auto"
          >
            Go Back
          </Button>

          <Button
            onClick={() => navigate(RoutePath.HOME)}
            className="w-full text-white bg-emerald-500 hover:bg-emerald-600 sm:w-auto"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
