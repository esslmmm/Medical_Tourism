"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Sample payment data - replace with actual data from props or API
const paymentData = {
  payment_date: "2025-11-05T08:27:33.725Z",
  payment_method: "card",
  amount: "2000",
  payment_status: "Successful",
  transaction_id: "pi_3SQ23wIMQJKJ4RfV1Ce5z4u5",
  booking_id: "982223ad-5ece-4593-8880-82cb30de78a3",
  payment_id: "d20b3a61-66a4-4308-a56f-25ed6e327d65",
  user_id: 1,
  user: {
    name: "EKKARAT SINGKHALA",
    email: "6531501137@lamduan.mfu.ac.th",
  },
};

export default function PaymentSuccessful() {
  const router = useRouter();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50 flex items-center justify-center p-6`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 12 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-green-500 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Payment Successful</h1>
          <p className="text-gray-500">Thank you for your purchase!</p>
        </motion.div>

        {/* Payment Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 mb-6 space-y-5"
        >
          {/* Amount Paid */}
          <div className="text-center pb-5 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
            <p className="text-3xl font-semibold text-gray-900">${paymentData.amount}.00</p>
          </div>

          {/* User */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Customer</p>
            <p className="text-base text-gray-900 font-medium">{paymentData.user.name}</p>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Date & Time</p>
            <p className="text-base text-gray-900">{formatDate(paymentData.payment_date)}</p>
          </div>

          {/* Reference */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Payment ID</p>
            <p className="text-sm text-gray-700 font-mono break-all">{paymentData.payment_id}</p>
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.push("/user/dashboard")}
          className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Return to Homepage
        </motion.button>
      </motion.div>
    </div>
  );
}
