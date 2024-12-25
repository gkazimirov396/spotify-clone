import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import AlbumPage from '@/pages/AlbumPage';
import ChatPage from '@/pages/chat/ChatPage';
import HomePage from '@/pages/home/HomePage';
import AuthCallback from '@/pages/AuthCallback';
import AdminPage from '@/pages/admin/AdminPage';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import RootLayout from '@/components/layout/RootLayout';

import { RoutePath } from './path';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: RoutePath.HOME,
        element: <HomePage />,
      },
      {
        path: RoutePath.CHAT,
        element: <PrivateRoute />,
        children: [
          {
            index: true,
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
    path: RoutePath.ADMIN,
    element: <AdminRoute />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
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
