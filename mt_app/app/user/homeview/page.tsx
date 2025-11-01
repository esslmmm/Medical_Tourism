"use client"
import React, { useState } from 'react';
import { Calendar, Clock, Users, ChevronDown, Search, Heart, Activity, Bone, ClipboardCheck, Scissors, Smile, Eye, Baby, Brain, Star, MapPin, ChevronRight, Globe } from 'lucide-react';

export default function MedicalTourismHome() {
  const [activeTab, setActiveTab] = useState('medical-service');
  const [appointmentDate, setAppointmentDate] = useState('10 NOV 2025');
  const [appointmentTime, setAppointmentTime] = useState('7:00');
  const [guests, setGuests] = useState('2 Adults, 1 child');

  const tabs = [
    { id: 'medical-service', label: 'Medical Service' },
    { id: 'medical-tourism', label: 'Medical Tourism Package' },
    { id: 'hospitals', label: 'Hospitals & Clinics' },
    { id: 'hotel', label: 'Hotel' }
  ];

  const treatments = [
    { icon: Heart, name: 'Heart', color: 'text-blue-500' },
    { icon: Activity, name: 'Cancer', color: 'text-blue-500' },
    { icon: Bone, name: 'Bone & Spine', color: 'text-blue-500' },
    { icon: ClipboardCheck, name: 'Check-up', color: 'text-blue-500' },
    { icon: Scissors, name: 'Surgery', color: 'text-blue-500' },
    { icon: Smile, name: 'Dental', color: 'text-blue-500' },
    { icon: Eye, name: 'Eye & Ent', color: 'text-blue-500' },
    { icon: Baby, name: 'Mother & Child', color: 'text-blue-500' },
    { icon: Smile, name: 'Aesthetic', color: 'text-blue-500' },
    { icon: Brain, name: 'Brain', color: 'text-blue-500' }
  ];

  const hospitals = [
    { name: 'Mae Fah Luang Medical Center', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop' },
    { name: 'Ladprao General Hospital', image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&h=300&fit=crop' },
    { name: 'Bangkok Hospital', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop' },
    { name: 'Bumrungrad International Hospital', image: 'https://images.unsplash.com/photo-1598536329656-20f6f7b9a2f7?w=500&h=300&fit=crop' },
    { name: 'Kasemrad Hospital', image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=500&h=300&fit=crop' }
  ];

  const packages = [
    { 
      name: 'Metal Health Package', 
      rating: 4.8, 
      reviews: 180,
      bookings: 150,
      tag: 'Medical Package',
      discount: '34% OFF',
      oldPrice: 3000,
      price: 2000,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop'
    },
    { 
      name: 'Dental Package', 
      rating: 4.8, 
      reviews: 180,
      bookings: 150,
      tag: 'Medical Package',
      discount: '33% OFF',
      oldPrice: 3000,
      price: 2000,
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop'
    },
    { 
      name: 'Physical Therapy Package', 
      rating: 4.8, 
      reviews: 160,
      bookings: 150,
      tag: 'Medical Tourism Package',
      discount: '33% OFF',
      oldPrice: 3000,
      price: 2000,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    { 
      name: 'Metal Health Package', 
      rating: 4.8, 
      reviews: 180,
      bookings: 150,
      tag: 'Medical Package',
      discount: '34% OFF',
      oldPrice: 3000,
      price: 2000,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop'
    }
  ];

  const reviews = [
    {
      name: 'Ahmed Muhammad',
      date: 'August 2025',
      country: 'Saudi Arabia',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was delicious and very well served.',
      countryCode: '🇸🇦'
    },
    {
      name: 'Wunna Kaungmyat',
      date: 'August 2025',
      country: 'Myanmar',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was delicious and very well served.',
      countryCode: '🇲🇲'
    },
    {
      name: 'Salah Muhammad',
      date: 'August 2025',
      country: 'Qatar',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day. We made them lunch and washed them in the lake. Our own dinner was delicious and very well served.',
      countryCode: '🇶🇦'
    }
  ];

  const faqs = [
    { title: 'How to Make Booking' },
    { title: 'Why Us?' },
    { title: 'VISA Process' },
    { title: 'Can I cancel Booking?' }
  ];

  const blogs = [
    {
      title: 'Top 5 Hospital in ASEAN 2025',
      tag: 'Ranking',
      image: 'https://images.unsplash.com/photo-1551601651-09629b1ede0f?w=400&h=250&fit=crop'
    },
    {
      title: 'Top 5 Hospital in Thailand 2025',
      tag: 'Ranking',
      image: 'https://images.unsplash.com/photo-1563492065239-9a2f0d6c3a1f?w=400&h=250&fit=crop'
    },
    {
      title: 'Tips for Medical Abroad',
      tag: 'Medical Service',
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=250&fit=crop'
    }
  ];

  const destinations = [
    { name: 'Phuket', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop' },
    { name: 'Bangkok', image: 'https://images.unsplash.com/photo-1563492065025-0fac229d6bb3?w=400&h=300&fit=crop' },
    { name: 'Chiang Mai', image: 'https://images.unsplash.com/photo-1598968430733-dac103c26e44?w=400&h=300&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-teal-500 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <div>SENIOR</div>
          <div>PROJECT</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">THB</span>
          <div className="w-8 h-6 bg-white rounded overflow-hidden flex items-center justify-center">
            <Globe className="w-5 h-5 text-teal-500" />
          </div>
          <button className="px-4 py-2 bg-white text-teal-500 rounded-full text-sm font-medium">
            Register
          </button>
          <button className="px-4 py-2 bg-white text-teal-500 rounded-full text-sm font-medium">
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero Section with Search */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Search Card */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-400 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search a destination or package"
                  className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-2xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            {/* Appointment Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Appointment</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-teal-400">
                  <Calendar className="text-teal-500 w-8 h-8" />
                  <div>
                    <div className="text-teal-500 font-semibold">{appointmentDate}</div>
                    <div className="text-sm text-gray-500">Monday</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-teal-400">
                  <Clock className="text-gray-400 w-8 h-8" />
                  <div>
                    <div className="text-sm text-gray-500">Time:</div>
                    <div className="font-semibold">{appointmentTime}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-teal-400">
                  <div className="flex items-center gap-3">
                    <Users className="text-teal-500 w-8 h-8" />
                    <div className="font-semibold">{guests}</div>
                  </div>
                  <ChevronDown className="text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full bg-teal-400 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-teal-500 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Treatment & Wellness Service */}
      <section className="max-w-7xl mx-auto px-6 py-16">
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
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Hospital & Clinic</h2>
          <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {hospitals.slice(0, 2).map((hospital, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 text-white text-2xl font-bold">{hospital.name}</h3>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          {hospitals.slice(2).map((hospital, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden h-48 group cursor-pointer">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{hospital.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Packages */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Recommended Packages</h2>
          <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{pkg.rating}</span>
                  <span className="text-sm text-gray-500">({pkg.reviews} reviews from {pkg.bookings}+ booked)</span>
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

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-16">
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
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-4 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer min-h-[200px] flex flex-col">
              <h3 className="font-bold text-lg mb-auto">{faq.title}</h3>
              <a href="#" className="text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1 mt-4">
                Learn more <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Blogs</h2>
        <div className="grid grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-teal-400 text-white rounded-full text-xs mb-3">
                  {blog.tag}
                </span>
                <h3 className="text-white text-xl font-bold mb-3">{blog.title}</h3>
                <a href="#" className="text-white hover:text-teal-300 font-medium flex items-center gap-1">
                  Learn more <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Destinations</h2>
          <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {destinations.map((destination, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden h-72 group cursor-pointer">
              <img src={destination.image} alt={destination.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-8 left-6 text-white text-3xl font-bold">{destination.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}