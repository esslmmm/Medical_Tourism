'use client';

import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

const paymentMethods = [
  { name: 'Card', icons: ['paypal', 'visa', 'mastercard'] },
  { name: 'Online Banking', icons: ['bank1', 'bank2', 'bank3'] },
  { name: 'QR Payment', icons: ['qr'] },
  { name: 'Wallet', icons: ['wallet'] }
];

export default function PaymentSelection() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholder: '',
    expiryDate: '',
    cvv: '',
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex gap-8">
      {/* Left Section - Payment Methods */}
      <div className="w-2/3">
        <h2 className="text-xl font-semibold">👋 Hi Ekkarat,</h2>
        <h3 className="text-2xl font-bold mt-4">Payment</h3>

        <div className="mt-4 border border-gray-300 rounded-2xl shadow-md overflow-hidden">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className={`p-4 flex justify-between items-center border-b border-gray-300 last:border-none cursor-pointer ${
                selectedMethod === method.name ? 'bg-green-100' : 'bg-white'
              }`}
              onClick={() => setSelectedMethod(method.name)}
            >
              <span className="font-medium text-lg">{method.name}</span>
              <div className="relative">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="hidden"
                  checked={selectedMethod === method.name}
                  readOnly
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedMethod === method.name
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-400 bg-white'
                  }`}
                >
                  {selectedMethod === method.name && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show Card Form when 'Card' is selected */}
        {selectedMethod === 'Card' && (
          <div className="mt-4 p-4 border border-gray-300 rounded-2xl shadow-md bg-white">
            <h4 className="text-lg font-semibold mb-2">Enter Card Details</h4>

            <label className="block text-sm font-medium">Card Number *</label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              maxLength={16}
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
            />

            <label className="block text-sm font-medium">Cardholder Name *</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={cardDetails.cardholder}
              onChange={(e) => setCardDetails({ ...cardDetails, cardholder: e.target.value })}
            />

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium">Expiry Date *</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  maxLength={5}
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium">CVV *</label>
                <input
                  type="password"
                  placeholder="***"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Agreement Checkbox */}
        <div className="flex items-start mt-4">
          <button onClick={() => setAgree(!agree)} className="mr-2 mt-1">
            {agree ? <CheckSquare size={20} className="text-green-500" /> : <Square size={20} />}
          </button>
          <p className="text-sm text-gray-600">
            I agree to receive updates and promotions about Medical Tourism and its affiliates.
          </p>
        </div>

        {/* Terms & Privacy */}
        <p className="text-sm text-gray-500 mt-4">
          By proceeding with this booking, I agree to Medical Tourism{' '}
          <a href="#" className="text-blue-500 underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* Pay Now Button */}
        <button
          className="mt-6 w-full py-3 text-white rounded-lg text-lg font-medium transition-all disabled:bg-gray-300 bg-blue-500"
          disabled={!selectedMethod || !agree}
        >
          Pay now
        </button>
      </div>

      {/* Right Section - Price Details */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Price Detail</h3>
        <div className="text-gray-700">
          <p className="flex justify-between">
            <span>Flight</span> <span>500 USD</span>
          </p>
          <p className="flex justify-between">
            <span>Medical Service</span> <span>500 USD</span>
          </p>
          <p className="flex justify-between">
            <span>Accommodation</span> <span>500 USD</span>
          </p>
          <p className="flex justify-between">
            <span>Taxes and fee</span> <span>500 USD</span>
          </p>
          <p className="flex justify-between text-red-500 font-bold mt-2">
            <span>50% discount</span>{' '}
            <span className="line-through text-gray-500">10,000 USD</span>
          </p>
          <p className="flex justify-between font-bold text-lg mt-2">
            <span>Total price</span> <span>5,000 USD</span>
          </p>
        </div>
        <p className="text-green-600 text-sm mt-2">You save 5,000 USD on this booking</p>
      </div>
    </div>
  );
}
