import React, { useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { handleGoogleSignIn } from '../components/Reuseable-Function/GoogleSignin';

interface OTPVerificationProps {
  email: string;
}

interface ApiResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    emailVerified: boolean;
  };
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle OTP input
  const handleOTPInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < 5) {
      const next = document.querySelectorAll<HTMLInputElement>("input")[idx + 1];
      if (next) next.focus();
    }
  };

  const handleOTPKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[idx]) {
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        const prev = document.querySelectorAll<HTMLInputElement>("input")[idx - 1];
        if (prev) prev.focus();
      }
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fullOtp = otp.join("");

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const result = await signIn("otp", {
        email,
        otp: fullOtp,
        redirect: false,
        callbackUrl: window.location.href,
      });

      if (result?.ok) {
        setSuccess('Email verified successfully!');
        setTimeout(() => router.push('/'), 1000);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setSuccess('New OTP sent to your email!');
        setTimer(60); // restart timer
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign in with OTP</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the OTP provided in the email sent to
          <br />
          <span className="font-medium text-gray-800">{email}</span>
        </p>

        <form onSubmit={handleVerifyOTP}>
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                className="w-12 h-14 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={digit}
                onChange={(e) => handleOTPInput(e, idx)}
                onKeyDown={(e) => handleOTPKeyDown(e, idx)}
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded border border-green-300">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={otp.join("").length < 6 || loading}
            className={`w-full py-3 rounded-full text-white font-semibold transition ${
              otp.join("").length < 6 || loading
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        <div className="text-center mt-4">
          {timer === 0 ? (
            <button
              onClick={handleResendOTP}
              disabled={resendLoading}
              className="text-blue-600 font-medium text-sm hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Sending..." : "Resend email"}
            </button>
          ) : (
            <p className="text-sm text-gray-600">
              Resend email in{" "}
              <span className="ml-1 font-semibold text-gray-800">
                00:{String(timer).padStart(2, "0")}
              </span>
            </p>
          )}
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center border border-gray-300 rounded-full px-6 py-3 bg-white hover:shadow-md transition w-[280px] sm:w-[320px] md:w-[360px] justify-center"
          >
            <Image
              src="/img/Homepage/google.png" // Ensure the icon is placed correctly
              alt="Google"
              width={24}
              height={24}
              className="mr-3"
            />
            <span className="text-base text-black font-medium">Sign in with Google</span>
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          By signing in, I agree to M&T’s{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
