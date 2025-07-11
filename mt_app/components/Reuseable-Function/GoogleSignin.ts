import { signIn } from 'next-auth/react';

export const handleGoogleSignIn = async () => {
  try {
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const fullCurrentUrl = `${currentPath}${currentSearch}`;

    // Store current URL to return after login
    localStorage.setItem('loginReturnUrl', fullCurrentUrl);

    await signIn('google', {
      callbackUrl: fullCurrentUrl,
    });
  } catch (error) {
    console.error('Google sign in failed:', error);
  }
};
