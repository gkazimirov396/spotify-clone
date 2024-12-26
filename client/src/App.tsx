import { useEffect, useState } from 'react';

import { RouterProvider } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

import { updateApiToken } from './lib/axios';
import { useChatStore } from './store/chat';

import LoaderElement from './components/LoaderElement';

import { router } from './router/router';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { getToken, userId } = useAuth();

  const initSocket = useChatStore(state => state.initSocket);
  const disconnectSocket = useChatStore(state => state.disconnectSocket);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken({ template: 'default' });
        updateApiToken(token);

        if (token && userId) {
          initSocket(userId);
        }
      } catch (error) {
        updateApiToken(null);
        console.log('Error in auth provider', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => disconnectSocket();
  }, [getToken, userId, initSocket, disconnectSocket]);

  if (isLoading) return <LoaderElement />;

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
