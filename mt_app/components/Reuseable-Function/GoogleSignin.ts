import { signIn } from 'next-auth/react';

export const handleGoogleSignIn = async () => {
  try {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/auth/callback',
    });
  } catch (error) {
    console.error('Google sign in failed:', error);
  }
};
