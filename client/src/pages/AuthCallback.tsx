import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

import authService from '@/services/auth';

import useSingleEffect from '@/hooks/useSingleEffect';

import { Card, CardContent } from '@/components/ui/card';

import { RoutePath } from '@/router/path';

export default function AuthCallback() {
  const queryClient = useQueryClient();

  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const { mutateAsync: login } = useMutation({
    mutationFn: authService.login,
    onError: error => toast.error(error.message),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['admin', 'status'] }),
  });

  useSingleEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;

      try {
        await login({
          id: user.id,
          userName: user.fullName ?? '',
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log('Error in auth callback', error);
      } finally {
        navigate(RoutePath.HOME, { replace: true });
      }
    };

    syncUser();
  });

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
