import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import AlbumPage from '@/pages/album/AlbumPage';
import ChatPage from '@/pages/chat/ChatPage';
import HomePage from '@/pages/home/HomePage';
import AuthCallback from '@/pages/AuthCallback';
import AdminPage from '@/pages/admin/AdminPage';
import ErrorPage from '@/pages/Error';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';

import RootLayout from '@/components/layout/RootLayout';

import { RoutePath } from './path';

export const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: RoutePath.HOME,
            element: <HomePage />,
          },
          {
            element: <PrivateRoute />,
            children: [
              {
                path: RoutePath.CHAT,
                element: <ChatPage />,
              },
            ],
          },
          {
            path: RoutePath.ALBUM,
            element: <AlbumPage />,
          },
          {
            path: RoutePath.NOT_FOUND,
            element: <NotFound />,
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: RoutePath.ADMIN,
            element: <AdminPage />,
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
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
        ],
      },
    ],
  },
]);
