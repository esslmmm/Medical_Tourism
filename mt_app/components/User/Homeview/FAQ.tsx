"use client";
import {
  ChevronRight,
} from "lucide-react";

const FAQ = () => {
 // 🔹 Scroll Functions
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
  };

  const faqs = [
    { title: "How to Make Booking" },
    { title: "Why Us?" },
    { title: "VISA Process" },
    { title: "Can I cancel Booking?" },
    { title: "How to Make Booking" },
    { title: "Why Us?" },
    { title: "VISA Process" },
    { title: "Can I cancel Booking?" },
  ];


  return (
    <div> <section className="max-w-7xl mx-auto px-6 py-7 relative text-black">
  <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("faqs-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("faqs-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  <div
    id="faqs-scroll"
    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {faqs.map((faq, idx) => (
      <div
        key={idx}
        className="min-w-[260px] min-h-[130px] bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col flex-shrink-0"
      >
        <h3 className="font-bold text-lg mb-auto">{faq.title}</h3>
        <a
          href="#"
          className="text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1 mt-4"
        >
          Learn more <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    ))}
  </div>
</section></div>
  )
}
export default FAQ