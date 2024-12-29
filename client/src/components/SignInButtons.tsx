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

  const signInWithGithub = () => {
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_github',
      redirectUrl: RoutePath.SSO_CALLBACK,
      redirectUrlComplete: RoutePath.AUTH_CALLBACK,
    });
  };

  return (
    <div className="flex gap-7">
      {isLoaded && (
        <>
          <Button
            variant="secondary"
            onClick={signInWithGoogle}
            className="w-full text-white border-zinc-200 h-11"
          >
            <img className="size-5" src={google} alt="Google" />
            Continue with Google
          </Button>

          <Button
            variant="secondary"
            onClick={signInWithGithub}
            className="w-full text-white border-zinc-200 h-11"
          >
            <img
              className="size-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png"
              alt="Github"
            />
            Continue with GitHub
          </Button>
        </>
      )}
    </div>
  );
}
