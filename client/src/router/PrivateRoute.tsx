import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Outlet /> : <RedirectToSignIn />;
}
