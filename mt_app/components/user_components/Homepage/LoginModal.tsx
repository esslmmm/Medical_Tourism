"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { signIn } from 'next-auth/react' // Use client-side signIn

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [hoveredButton, setHoveredButton] = useState(null);

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

  // Handle Google sign in - NextAuth handles everything automatically
    const handleGoogleSignIn = async () => {
      try {
        // Store current page and booking intent
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const fullCurrentUrl = `${currentPath}${currentSearch}`;
        
        // Store for after login
        localStorage.setItem('loginReturnUrl', fullCurrentUrl);
        
        await signIn('google', { 
          callbackUrl: fullCurrentUrl, // Use current page as callback
        });
        
      } catch (error) {
        console.error('Google sign in failed:', error);
      }
    };

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const router = useRouter()

  // const handleSubmit = async (e: React.FormEvent) => {

  //   e.preventDefault()
  //   try{
  //     const result = await signIn('credentials', {
  //       redirect:false,
  //       email,
  //       password
  //     })

  //     if (!result) {
  //       console.error('Sign-in request failed. No response received.')
  //       return false
  //     }

  //     if(result.error){
  //       console.error()
  //       return false
  //     }

  //     //Login Success
  //     // After successful login, call handleSuccessfulLogin with user data
  //     // handleSuccessfulLogin({
  //     //   name: result.user.name,
  //     //   email: result.user.email,
  //     //   avatar: result.user.image
  //     // });
  //     router.push('/')
  //   }catch(error){

  //   }
  // }

  return (
    <form className="fixed inset-0 flex items-center justify-center bg-black/45 z-50"
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
              placeholder="Enter your email address"
              className={`font-light w-70 px-4 py-3 border border-[#C4C4C4] rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-sm ${poppins.className}`}
              style={{ fontSize: "13px" }}
            />
          </div>
          <div className="flex justify-center">
            <button className={`${poppins.className} w-70 bg-[#1A901A] text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition`} style={{ fontSize: "15px" }}>
              CONTINUE
            </button>
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

