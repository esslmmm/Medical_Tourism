"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function PaymentSuccessful() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const id = params.id;
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from API
  useEffect(() => {
    if (!id) return;

    const fetchPayment = async () => {
      try {
        const res = await fetch(`/api/payment/${id}`);
        const data = await res.json();

        if (data.success) {
          setPaymentData(data.payment);
        } else {
          setError("Payment not found.");
        }
      } catch (err) {
        setError("Failed to fetch payment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading payment details...
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error || "Something went wrong."}
      </div>
    );
  }

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
          onClick={() => router.push("/user/general/booking-status")}
          className="w-full bg-emerald-500 text-white py-3.5 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
        >
          Return to My Bookings
        </motion.button>
      </motion.div>
    </div>
  );
}
