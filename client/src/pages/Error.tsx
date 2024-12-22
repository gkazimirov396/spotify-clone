import { AlertTriangle } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button';

export default function ErrorPage({ error }: FallbackProps) {
  const errorMessage = error?.data?.message ?? error.message ?? '';

  return (
    <section className="flex items-center justify-center h-screen bg-neutral-900">
      <div className="px-4 space-y-8 text-center">
        <div className="flex justify-center animate-bounce">
          <AlertTriangle size="6em" className="w-24 h-24 text-error" />
        </div>

        <div className="space-y-4">
          <h1 className="font-bold text-white text-7xl">500</h1>
          <h2 className="text-2xl font-semibold text-white">
            Something Went Wrong
          </h2>
          <p className="max-w-md mx-auto text-neutral-400">{errorMessage}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
          <Button
            variant="destructive"
            onClick={window.location.reload}
            className="w-full text-white sm:w-auto"
          >
            Refresh the page
          </Button>
        </div>
      </div>
    </section>
  );
}
