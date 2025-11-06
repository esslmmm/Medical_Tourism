"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, Calendar, CreditCard, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function PaymentSuccessful() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <div className={`${poppins.className} min-h-screen bg-white flex items-center justify-center p-4`}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setShowModal(true)}
        className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold text-lg hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Click Here
      </motion.button>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Success Animation Container */}
                <div className="pt-12 pb-8 px-8 text-center">
                  {/* Animated Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      {/* Outer Pulse Ring */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-green-400 rounded-full"
                      />

                      {/* Success Icon */}
                      <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-lg"
                      >
                        <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Success Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-slate-900 mb-3"
                  >
                    Payment Successful!
                  </motion.h2>

                  {/* Success Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-600 text-base mb-8 leading-relaxed"
                  >
                    Thank you for your payment. Your booking has been confirmed and you will receive a confirmation email shortly.
                  </motion.p>

                  {/* Transaction Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-slate-50 rounded-xl p-6 mb-8 space-y-4"
                  >
                    {/* Booking ID */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-slate-600" />
                        <span className="text-sm text-slate-600 font-medium">Booking ID</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">#BK2025-12345</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-200" />

                    {/* Amount */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-slate-600" />
                        <span className="text-sm text-slate-600 font-medium">Amount Paid</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">$2,499.99</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-200" />

                    {/* Payment Method */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-slate-600" />
                        <span className="text-sm text-slate-600 font-medium">Payment Method</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">Visa •••• 4242</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-200" />

                    {/* Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-slate-600" />
                        <span className="text-sm text-slate-600 font-medium">Transaction Date</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {new Date().toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-3"
                  >
                    {/* View Booking Button */}
                    <motion.button
                      onClick={() => router.push("/user/profile/approval-status")}
                      className="w-full bg-slate-800 text-white py-4 rounded-lg font-semibold text-base hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>View My Bookings</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>

                    {/* Secondary Button */}
                    <motion.button
                      onClick={() => setShowModal(false)}
                      className="w-full bg-slate-100 text-slate-700 py-4 rounded-lg font-semibold text-base hover:bg-slate-200 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
