import { RedirectToSignUp, useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Loader } from 'lucide-react';

import authService from '@/services/auth';

export default function AdminRoute() {
  const { isSignedIn } = useAuth();

  const {
    data: isAdmin,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['admin', 'status'],
    queryFn: authService.checkAdminStatus,
  });

  if (!isSignedIn) return <RedirectToSignUp />;

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return !isSuccess || !isAdmin ? <h2>Unauthorized</h2> : <Outlet />;
}
