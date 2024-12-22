import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Loader } from 'lucide-react';

import authService from '@/services/auth';

import { Card, CardContent } from '@/components/ui/card';

export default function AuthCallback() {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;

      try {
        syncAttempted.current = true;

        await authService.login({
          id: user.id,
          userName: user.username ?? '',
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log('Error in auth callback', error);
      } finally {
        navigate('/');
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <section className="flex items-center justify-center w-full h-screen bg-black">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />

          <h3 className="text-xl font-bold text-zinc-400">Logging you in</h3>
          <p className="text-sm text-zinc-400">Redirecting...</p>
        </CardContent>
      </Card>
    </section>
  );
}
