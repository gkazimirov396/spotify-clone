import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import AuthCallback from '@/pages/AuthCallback';

import RootLayout from '@/components/layout/RootLayout';

import { RoutePath } from './path';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: RoutePath.HOME,
        // element: <Home />
      },
      {
        path: RoutePath.CHAT,
        // element: <Chat />
      },
      {
        path: RoutePath.ALBUM,
        // element: <Album />
      },
      {
        path: RoutePath.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
  {
    path: RoutePath.ADMIN,
    // element: <Admin />
  },
  {
    path: RoutePath.AUTH_CALLBACK,
    element: <AuthCallback />,
  },
  {
    path: RoutePath.SSO_CALLBACK,
    element: (
      <AuthenticateWithRedirectCallback
        signUpForceRedirectUrl={RoutePath.AUTH_CALLBACK}
      />
    ),
  },
]);
