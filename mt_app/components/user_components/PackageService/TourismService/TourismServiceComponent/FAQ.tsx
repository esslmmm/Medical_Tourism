import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I cancel my booking?",
      answer: (
        <>
          <p>
            You can cancel your booking online on the Agoda website or app, under the
            "My bookings" section in the account menu.
          </p>
          <p>
            Please double-check the cancellation policy of your activity before booking.
            Some operators do not allow refunds in case of cancellation.
          </p>
        </>
      ),
    },
    {
      question: "When will I receive the refund for cancelled bookings?",
      answer: (
        <p>
          Refunds are typically processed within 5–10 business days, depending on your
          payment method and bank processing times.
        </p>
      ),
    },
    {
      question: "How do vouchers work?",
      answer: (
        <p>
          Vouchers are electronic tickets sent to your email after booking confirmation.
          Show them to the service provider on arrival.
        </p>
      ),
    },
    {
      question: "Who and when do I pay?",
      answer: (
        <p>
          Payment is usually made at the time of booking unless otherwise stated in the
          activity details.
        </p>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-black">
        Frequently asked questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <div
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3
                className={`font-bold ${
                  openIndex === index ? "text-teal-500" : "text-black"
                }`}
              >
                {faq.question}
              </h3>
              <ChevronDownIcon
                className={`w-6 h-6 text-teal-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {openIndex === index && (
              <div className="text-gray-600 text-sm space-y-2">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
