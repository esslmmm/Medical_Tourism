// pages/verify-otp.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import OTPVerification from './OTPVerification';


const VerifyOTPPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.email && typeof router.query.email === 'string') {
      setEmail(router.query.email);
    }
  }, [router.isReady, router.query]);

  if (!email) {
    return <div>Loading...</div>;
  }

  return <OTPVerification email={email} />;
}

export default VerifyOTPPage;