"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  ChevronDown,
  Search,
  Heart,
  Activity,
  Bone,
  ClipboardCheck,
  Scissors,
  Smile,
  Eye,
  Baby,
  Brain,
  Star,
  ChevronRight,
} from "lucide-react";
import Footer from "@/components/user_components/Main/Footer";

export default function MedicalTourismHome() {
  const [activeTab, setActiveTab] = useState("medical-service");
  const [appointmentDate] = useState("10 NOV 2025");
  const [appointmentTime] = useState("7:00");
  const [guests] = useState("2 Adults, 1 child");

  // 🔹 Scroll Functions
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
  };

  // 🔹 Tab Data
  const tabs = [
    { id: "medical-service", label: "Medical Service" },
    { id: "medical-tourism", label: "Medical Tourism Package" },
    { id: "hospitals", label: "Hospitals & Clinics" },
    { id: "hotel", label: "Hotel" },
  ];

  // 🔹 Treatment List
  const treatments = [
    { icon: Heart, name: "Heart", color: "text-blue-500" },
    { icon: Activity, name: "Cancer", color: "text-blue-500" },
    { icon: Bone, name: "Bone & Spine", color: "text-blue-500" },
    { icon: ClipboardCheck, name: "Check-up", color: "text-blue-500" },
    { icon: Scissors, name: "Surgery", color: "text-blue-500" },
    { icon: Smile, name: "Dental", color: "text-blue-500" },
    { icon: Eye, name: "Eye & Ent", color: "text-blue-500" },
    { icon: Baby, name: "Mother & Child", color: "text-blue-500" },
    { icon: Smile, name: "Aesthetic", color: "text-blue-500" },
    { icon: Brain, name: "Brain", color: "text-blue-500" },
  ];

  // 🔹 Hospital List
  const hospitals = [
    {
      name: "Mae Fah Luang Medical Center",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop",
    },
    {
      name: "Ladprao General Hospital",
      image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&h=300&fit=crop",
    },
    {
      name: "Bangkok Hospital",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop",
    },
    {
      name: "Bumrungrad International Hospital",
      image:
        "https://images.unsplash.com/photo-1598536329656-20f6f7b9a2f7?w=500&h=300&fit=crop",
    },
    {
      name: "Kasemrad Hospital",
      image:
        "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=500&h=300&fit=crop",
    },
  ];

  // 🔹 Package List
  const packages = [
    {
      name: "Metal Health Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "34% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    },
    {
      name: "Dental Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "33% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop",
    },
    {
      name: "Physical Therapy Package",
      rating: 4.8,
      reviews: 160,
      bookings: 150,
      tag: "Medical Tourism Package",
      discount: "33% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    },
    {
      name: "Mental Health Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "34% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    },
    {
      name: "Metal Health Package",
      rating: 4.8,
      reviews: 180,
      bookings: 150,
      tag: "Medical Package",
      discount: "34% OFF",
      oldPrice: 3000,
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    },
  ];

  // 🔹 Reviews
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

  // 🔹 FAQs
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

  // 🔹 Blogs
  const blogs = [
    {
      title: "Top 5 Hospital in ASEAN 2025",
      tag: "Ranking",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop",
    },
    {
      title: "Top 5 Hospital in Thailand 2025",
      tag: "Ranking",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    },
    {
      title: "Tips for Medical Abroad",
      tag: "Medical Service",
      image:
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=250&fit=crop",
    },
    {
      title: "Top 5 Hospital in ASEAN 2025",
      tag: "Ranking",
      image:
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop",
    },
  ];

  // 🔹 Destinations
  const destinations = [
    {
      name: "Phuket",
      image:
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop",
    },
    {
      name: "Bangkok",
      image:
        "https://static.independent.co.uk/2025/01/03/14/newFile-12.jpg",
    },
    {
      name: "Chiang Mai",
      image:
        "https://content.r9cdn.net/rimg/dimg/d7/a3/11b8ae51-city-6042-1638dab0fe6.jpg?width=1200&height=630&xhint=1542&yhint=1041&crop=true",
    },
    {
      name: "Chiang Rai",
      image:
        "https://images.unsplash.com/photo-1671188893377-ee825a53d27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDQ3fHxjaGlhbmclMjByYWl8ZW58MHx8fHwxNjg1MzM5OTUxfDA&ixlib=rb-4.0.3&q=80&w=2000",
    },
  ];
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="bg-teal-400 text-white px-8 py-4 flex justify-between items-center">
        <div className="text-lg font-bold leading-tight">
          <div>SENIOR</div>
          <div>PROJECT</div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium cursor-pointer hover:opacity-80">Contact US</span>
          <span className="text-sm font-medium cursor-pointer hover:opacity-80">THB</span>
          <div className="w-8 h-6 rounded overflow-hidden flex items-center justify-center">
            <svg className="w-8 h-6" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="30" fill="#012169"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
              <path d="M30,0 L30,30 M0,15 L60,15" stroke="#FFF" strokeWidth="10"/>
              <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/>
            </svg>
          </div>
          <button className="px-5 py-2 bg-white text-teal-400 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
            Register
          </button>
          <button className="px-5 py-2 bg-white text-teal-400 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero Section with Search */}
<div className="relative bg-black py-12">
  {/* Search Card */}
  <div className="max-w-5xl mx-auto px-4">
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-teal-400 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-teal-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search a destination or package"
            className="w-full pl-16 pr-6 py-4 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      {/* Appointment Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Appointment</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Date */}
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-gray-100 rounded-xl cursor-pointer hover:border-teal-400 transition-colors">
            <Calendar className="text-teal-400 w-10 h-10 flex-shrink-0" />
            <div>
              <div className="text-teal-400 font-bold text-base">{appointmentDate}</div>
              <div className="text-sm text-gray-500">Monday</div>
            </div>
          </div>
          
          {/* Time */}
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-gray-100 rounded-xl cursor-pointer hover:border-teal-400 transition-colors">
            <Clock className="text-gray-400 w-10 h-10 flex-shrink-0" />
            <div>
              <div className="text-sm text-gray-500">Time:</div>
              <div className="font-bold text-gray-900 text-base">{appointmentTime}</div>
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-xl cursor-pointer hover:border-teal-400 transition-colors">
            <div className="flex items-center gap-4">
              <Users className="text-teal-400 w-10 h-10 flex-shrink-0" />
              <div className="font-bold text-gray-900 text-base">{guests}</div>
            </div>
            <ChevronDown className="text-gray-400 w-5 h-5 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-teal-400 text-white py-4 rounded-xl font-bold text-base hover:bg-teal-500 transition-colors shadow-lg">
        Search
      </button>
    </div>
  </div>
</div>

      {/* Recommended Packages */}
      <section className="max-w-7xl mx-auto px-6 py-10 pb-5 relative">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold">Recommended Packages</h2>
    <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
      View All <ChevronRight className="w-4 h-4" />
    </a>
  </div>

  {/* Scroll Buttons */}
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("packages-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("packages-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  {/* Scrollable Container */}
  <div
    id="packages-scroll"
    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {packages.map((pkg, idx) => (
      <div
        key={idx}
        className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex-shrink-0"
      >
        <div className="relative">
          <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{pkg.rating}</span>
            <span className="text-sm text-gray-500">
              ({pkg.reviews} reviews from {pkg.bookings}+ booked)
            </span>
          </div>
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-xs mb-3">
            {pkg.tag}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-red-500 font-bold text-sm">{pkg.discount}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">฿ {pkg.oldPrice}</span>
                <span className="text-teal-500 font-bold text-xl">฿ {pkg.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Treatment & Wellness Service */}
      <section className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Treatment & Wellness Service</h2>
          <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {treatments.map((treatment, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center gap-3">
              <treatment.icon className={`w-12 h-12 ${treatment.color}`} />
              <span className="font-medium text-center">{treatment.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital & Clinic */}
      <section className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Hospital & Clinic</h2>
          <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {hospitals.slice(0, 2).map((hospital, idx) => (
            <div key={idx} className="relative rounded-md overflow-hidden h-64 group cursor-pointer">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 text-white text-2xl font-bold">{hospital.name}</h3>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          {hospitals.slice(2).map((hospital, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{hospital.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      {/* <section className="max-w-7xl mx-auto px-6 py-7">
        <h2 className="text-3xl font-bold mb-8">Review</h2>
        <div className="grid grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm">
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
              <a href="#" className="text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1">
                View Package <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section> */}
      {/* Reviews */}
<section className="max-w-7xl mx-auto px-6 py-7 relative">
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
        className="min-w-[370px] w-64 bg-white rounded-2xl p-6 shadow-sm flex-shrink-0"
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
</section>


      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-6 py-7 relative">
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
</section>


      {/* Blogs */}
      <section className="max-w-7xl mx-auto px-6 py-7 pb-3 relative">
  <h2 className="text-3xl font-bold mb-8">Blogs</h2>

  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("blogs-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("blogs-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  <div
    id="blogs-scroll"
    className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {blogs.map((blog, idx) => (
      <div
        key={idx}
        className="min-w-[320px] relative rounded-2xl overflow-hidden h-64 w-99 group cursor-pointer flex-shrink-0"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-block px-3 py-1 bg-teal-400 text-white rounded-full text-xs mb-3">
            {blog.tag}
          </span>
          <h3 className="text-white text-xl font-bold mb-3">{blog.title}</h3>
          <a
            href="#"
            className="text-white hover:text-teal-300 font-medium flex items-center gap-1"
          >
            Learn more <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-5 pb-24 relative">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold">Popular Destinations</h2>
    <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
      View All <ChevronRight className="w-4 h-4" />
    </a>
  </div>

  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("destinations-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("destinations-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  <div
    id="destinations-scroll"
    className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {destinations.map((destination, idx) => (
      <div
        key={idx}
        className="min-w-[300px] relative rounded-lg overflow-hidden h-64 w-99 group cursor-pointer flex-shrink-0"
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-8 left-6 text-white text-3xl font-bold">
          {destination.name}
        </h3>
      </div>
    ))}
  </div>
</section>


      <Footer />
    </div>
  );
}