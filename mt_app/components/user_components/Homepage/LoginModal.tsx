"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/45 z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#F8F8F8] w-250 h-120 rounded-lg shadow-lg overflow-hidden flex"
      >
        <div className="w-1/2 p-8 flex flex-col justify-center relative">
          <button className="absolute top-4 right-4" onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </button>
          <div className="flex justify-center">
            <img src="/Medical Tourism.png" alt="Logo" className="w-30 h-auto mb-8" />
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
            <button className="flex w-30 items-center justify-center bg-white border border-[#BCBEC0] rounded-md py-2 hover:bg-gray-100">
              <img src="/google.png" alt="Google" className="w-5 h-5" />
            </button>
            <button className="flex w-30 items-center justify-center bg-white border border-[#BCBEC0] rounded-md py-2 hover:bg-gray-100">
              <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="w-1/2 relative hidden md:block">
          <Image
            src="/airplane.png"
            alt="Medical Tourism"
            layout="fill"
            objectFit="cover"
            className="rounded-r-lg"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
