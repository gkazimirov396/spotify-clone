import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { router } from './router/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
