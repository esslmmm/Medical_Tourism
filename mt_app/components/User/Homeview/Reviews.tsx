"use client";
import {
  Star,
  ChevronRight,
} from "lucide-react";

const Reviews = () => {
    // 🔹 Scroll Functions
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
  };

  const reviews = [
    {
      name: "Ahmed Muhammad",
      date: "August 2025",
      country: "Saudi Arabia",
      rating: 5,
      text: "We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was delicious and very well served.",
      countryCode: "🇸🇦",
    },
    {
      name: "Wunna Kaungmyat",
      date: "August 2025",
      country: "Myanmar",
      rating: 5,
      text: "We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was delicious and very well served.",
      countryCode: "🇲🇲",
    },
    {
      name: "Salah Muhammad",
      date: "August 2025",
      country: "Qatar",
      rating: 5,
      text: "We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was delicious and very well served.",
      countryCode: "🇶🇦",
    },
    {
      name: "Ahmed Muhammad",
      date: "August 2025",
      country: "Saudi Arabia",
      rating: 5,
      text: "We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was delicious and very well served.",
      countryCode: "🇸🇦",
    },
  ];


  return (
    <div><section className="max-w-7xl mx-auto px-6 py-7 relative">
  <h2 className="text-3xl font-bold mb-8">Review</h2>

  {/* Scroll Buttons */}
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("reviews-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("reviews-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  {/* Scrollable Reviews Container */}
  <div
    id="reviews-scroll"
    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {reviews.map((review, idx) => (
      <div
        key={idx}
        className="min-w-[370px] w-64 bg-white rounded-2xl p-6 shadow-sm flex-shrink-0 border border-gray-300"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">
            {review.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="font-bold">{review.name}</h4>
            <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{review.countryCode}</span>
              <span className="text-sm text-gray-600">{review.country}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{review.text}</p>
        <div className="flex gap-1 mb-3">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-3">5 out of 5 rating</p>
        <a
          href="#"
          className="text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1"
        >
          View Package <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    ))}
  </div>
</section></div>
  )
}
export default Reviews