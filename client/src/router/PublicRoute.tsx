import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const { isSignedIn } = useAuth();

  return !isSignedIn ? <Outlet /> : <Navigate to=".." />;
}
