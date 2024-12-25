import { RedirectToSignUp, useAuth } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Outlet /> : <RedirectToSignUp />;
}
