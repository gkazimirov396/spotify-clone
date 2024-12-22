import { useSignIn } from '@clerk/clerk-react';

import { Button } from './ui/button';

import { RoutePath } from '@/router/path';

import google from '@/assets/images/google.png';

export default function SignInButtons() {
  const { signIn, isLoaded } = useSignIn();

  const signInWithGoogle = () => {
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: RoutePath.SSO_CALLBACK,
      redirectUrlComplete: RoutePath.AUTH_CALLBACK,
    });
  };

  return (
    <>
      {isLoaded && (
        <Button
          variant="secondary"
          onClick={signInWithGoogle}
          className="w-full text-white border-zinc-200 h-11"
        >
          <img className="size-5" src={google} alt="Google" />
          Continue with Google
        </Button>
      )}
    </>
  );
}
