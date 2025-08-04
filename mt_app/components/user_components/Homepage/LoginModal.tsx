import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { handleGoogleSignIn } from "../../Reuseable-Function/GoogleSignin";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

interface ApiResponse {
  message: string;
  email?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, initialEmail }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const router = useRouter()

      // Update email when initialEmail changes
      useEffect(() => {
        if (initialEmail) {
          setEmail(initialEmail);
        }
      }, [initialEmail]);
      
      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [onClose]);

      if (!isOpen) return null;

        const handleSendOTP = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
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
              setOtpSent(true); // Keep this for state tracking
              // Navigate only after successful OTP sending
              router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
              onClose(); // Close the modal
            } else {
              setError(data.message);
            }
          } catch (error) {
            setError('An error occurred. Please try again.');
          } finally {
            setLoading(false);
          }
        };

  return (
    <form 
      onSubmit={handleSendOTP}
      className="fixed inset-0 flex items-center justify-center bg-black/45 z-50"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#F8F8F8] w-250 h-120 rounded-lg shadow-lg overflow-hidden flex"
      >
        <div className="w-1/2 p-8 flex flex-col justify-center relative">
          <div className="flex justify-center">
            <img src="/img/Footer&Navbar/Medical Tourism.png" alt="Logo" className="w-30 h-auto mb-8" />
          </div>
          <p className={`text-[#030303] font-medium text-center ${poppins.className}`} style={{ fontSize: "34px" }}>
            SIGN IN/SIGN UP
          </p>
          <p className={`text-[#636364] text-center mb-6 font-light ${poppins.className}`} style={{ fontSize: "14px" }}>
            Welcome! Please enter your email.
          </p>
            <div className="flex justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`font-light w-70 px-4 py-3 border border-[#C4C4C4] rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-sm ${poppins.className}`}
                style={{ fontSize: "13px" }}
                required
              />
            </div>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
            <div className="flex justify-center">
              <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${poppins.className} w-70 bg-[#1A901A] text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition flex items-center justify-center gap-2`}
      style={{ fontSize: '15px', position: 'relative', minHeight: '40px' }}
    >
      {loading ? (
        <div className="flex items-center gap-1">
          <span>Loading</span>
          <span className="dot-1">.</span>
          <span className="dot-2">.</span>
          <span className="dot-3">.</span>
        </div>
      ) : (
        'CONTINUE'
      )}
    </motion.button>
            </div>
          <div className="flex items-center justify-center my-4">
            <hr className="border-black w-15" />
            <span className={`${poppins.className} mx-2 text-[#9D9A9A] text-sm`} style={{ fontSize: "10px" }}>
              MORE SIGN IN METHODS
            </span>
            <hr className="border-black w-15" />
          </div>
          <div className="flex gap-4 justify-center">
            {/* Google Button */}
            <button 
              type="button"
              className="group relative flex w-32 items-center justify-center bg-white border border-[#BCBEC0] rounded-lg py-3 px-4 overflow-hidden transition-all duration-300 ease-out hover:border-[#1A901A] hover:shadow-lg hover:shadow-green-100 hover:-translate-y-1 active:scale-95 active:translate-y-0 cursor-pointer"
              onClick={handleGoogleSignIn}
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-100 bg-gray-200 animate-ping"></div>
              
              {/* Icon container */}
              <div className="relative z-10 flex items-center gap-2">
                <div className={`transition-transform duration-300 ${hoveredButton === 'google' ? 'scale-110 rotate-12' : ''}`}>
                  <img 
                    src="/img/Homepage/google.png" 
                    alt="Google" 
                    className="w-5 h-5" 
                  />
                </div>
                {/* <span className={`text-sm font-medium text-gray-700 transition-all duration-300 ${hoveredButton === 'google' ? 'translate-x-1' : ''}`}>
                  Google
                </span> */}
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:animate-pulse"></div>
            </button>

            {/* Facebook Button */}
            <button 
              type="button"
              className="group relative flex w-32 items-center justify-center bg-white border border-[#BCBEC0] rounded-lg py-3 px-4 overflow-hidden transition-all duration-300 ease-out hover:border-[#1877F2] hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 active:scale-95 active:translate-y-0 cursor-pointer"
              // onClick={handleFacebookSignIn}
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-100 bg-gray-200 animate-ping"></div>
              
              {/* Icon container */}
              <div className="relative z-10 flex items-center gap-2">
                <div className={`transition-transform duration-300 ${hoveredButton === 'facebook' ? 'scale-110 rotate-12' : ''}`}>
                  <img 
                    src="/img/Homepage/facebook.png" 
                    alt="Facebook" 
                    className="w-5 h-5" 
                  />
                </div>
                {/* <span className={`text-sm font-medium text-gray-700 transition-all duration-300 ${hoveredButton === 'facebook' ? 'translate-x-1' : ''}`}>
                  Facebook
                </span> */}
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:animate-pulse"></div>
            </button>
          </div>
        </div>
        <div className="w-1/2 relative hidden md:block">
          <Image
            src="/img/Homepage/airplane.png"
            alt="Medical Tourism"
            layout="fill"
            objectFit="cover"
            className="rounded-r-lg"
          />
        </div>
      </motion.div>
    </form>
  );
};

export default LoginModal;

