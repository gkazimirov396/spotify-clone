import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from 'react-error-boundary';
import { ClerkProvider } from '@clerk/clerk-react';

import ErrorPage from './pages/Error.tsx';

import App from './App.tsx';

import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key!');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <App />
      </ErrorBoundary>
    </ClerkProvider>
  </StrictMode>
);
