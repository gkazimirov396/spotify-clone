import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import Unauthorized from '@/pages/Unauthorized';
import LoaderElement from '@/components/LoaderElement';

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
    staleTime: Infinity,
  });

  if (!isSignedIn) return <RedirectToSignIn />;

  if (isLoading) return <LoaderElement />;

  return !isSuccess || !isAdmin ? <Unauthorized /> : <Outlet />;
}
