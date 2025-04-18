import { Home, Music2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import { RoutePath } from '@/router/path';

export default function Unauthorized() {
  return (
    <section className="flex items-center justify-center h-screen bg-neutral-900">
      <div className="px-4 space-y-8 text-center">
        <div className="flex justify-center animate-bounce">
          <Music2 className="w-24 h-24 text-emerald-500" />
        </div>

        <div className="space-y-4">
          <h1 className="font-bold text-white text-7xl">403</h1>
          <h2 className="text-2xl font-semibold text-white">Unauthorized</h2>
          <p className="max-w-md mx-auto text-neutral-400">
            You are forbidden to enter this page.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
          <Link
            to=".."
            className={cn(
              buttonVariants({
                variant: 'outline',
                className:
                  'w-full text-white bg-neutral-800 hover:bg-neutral-700 border-neutral-700 sm:w-auto',
              })
            )}
          >
            Go Back
          </Link>

          <Link
            to={RoutePath.HOME}
            className={cn(
              buttonVariants({
                variant: 'default',
                className:
                  'w-full text-white bg-emerald-500 hover:bg-emerald-600 sm:w-auto',
              })
            )}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
