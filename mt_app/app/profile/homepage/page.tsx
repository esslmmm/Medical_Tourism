"use client"
import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Star, MapPin, Clock, Users, CheckCircle, ArrowRight, Zap, Award, Shield, Calendar } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  category: 'medical' | 'tourism' | 'combo';
  price: number;
  originalPrice?: number;
  duration: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  hospital: string;
  doctor: string;
  isPopular?: boolean;
  isNew?: boolean;
  discount?: number;
}

const MedicalTourismPackages: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'medical' | 'tourism' | 'combo'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'rating'>('popular');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const packages: Package[] = [
    {
      id: '1',
      title: 'Complete Heart Surgery Package',
      category: 'medical',
      price: 25000,
      originalPrice: 45000,
      duration: '14 days',
      location: 'Bangkok, Thailand',
      rating: 4.9,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      features: ['Pre-surgery consultation', '24/7 medical care', 'Luxury recovery suite', 'Family accommodation'],
      hospital: 'Bumrungrad International',
      doctor: 'Dr. Sarah Johnson',
      isPopular: true,
      discount: 44
    },
    {
      id: '2',
      title: 'Premium Dental Transformation',
      category: 'medical',
      price: 8500,
      originalPrice: 12000,
      duration: '7 days',
      location: 'Istanbul, Turkey',
      rating: 4.8,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=250&fit=crop',
      features: ['Full mouth reconstruction', 'Luxury hotel stay', 'City tour included', 'Follow-up care'],
      hospital: 'Acibadem Healthcare',
      doctor: 'Dr. Mehmet Ozkan',
      discount: 29
    },
    {
      id: '3',
      title: 'Wellness & Recovery Retreat',
      category: 'combo',
      price: 15000,
      duration: '10 days',
      location: 'Seoul, South Korea',
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop',
      features: ['Health checkup', 'Spa treatments', 'Traditional healing', 'Cultural experiences'],
      hospital: 'Samsung Medical Center',
      doctor: 'Dr. Kim Min-jun',
      isNew: true
    },
    {
      id: '4',
      title: 'Orthopedic Excellence Program',
      category: 'medical',
      price: 32000,
      originalPrice: 55000,
      duration: '21 days',
      location: 'Singapore',
      rating: 4.9,
      reviews: 412,
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop',
      features: ['Joint replacement', 'Physiotherapy', 'Rehabilitation center', 'Concierge service'],
      hospital: 'Singapore General Hospital',
      doctor: 'Dr. Michael Chen',
      isPopular: true,
      discount: 42
    },
    {
      id: '5',
      title: 'Luxury Medical Tourism',
      category: 'combo',
      price: 45000,
      duration: '14 days',
      location: 'Mumbai, India',
      rating: 4.6,
      reviews: 298,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop',
      features: ['Premium medical care', '5-star accommodation', 'Private tours', 'Personal butler'],
      hospital: 'Apollo Hospitals',
      doctor: 'Dr. Priya Sharma'
    },
    {
      id: '6',
      title: 'Cosmetic Surgery Getaway',
      category: 'medical',
      price: 18000,
      originalPrice: 28000,
      duration: '12 days',
      location: 'Bangkok, Thailand',
      rating: 4.8,
      reviews: 367,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=250&fit=crop',
      features: ['Consultation & surgery', 'Recovery spa', 'Shopping tours', 'Aftercare package'],
      hospital: 'Bangkok Hospital',
      doctor: 'Dr. Ananya Patel',
      discount: 36
    }
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesFilter = activeFilter === 'all' || pkg.category === activeFilter;
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  const toggleFavorite = (packageId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(packageId)) {
      newFavorites.delete(packageId);
    } else {
      newFavorites.add(packageId);
    }
    setFavorites(newFavorites);
  };

  const stats = [
    { icon: Users, value: '15K+', label: 'Happy Patients' },
    { icon: Award, value: '500+', label: 'Partner Hospitals' },
    { icon: Shield, value: '98%', label: 'Success Rate' },
    { icon: MapPin, value: '50+', label: 'Destinations' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MedTravel
              </h1>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Packages</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Hospitals</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Doctors</a>
              </nav>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              Get Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Premium Medical Tourism Packages</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Health,
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Transform Your Life
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover world-class medical treatments combined with unforgettable travel experiences. 
              Your journey to better health starts here.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search packages, locations, hospitals..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'price' | 'rating')}
                className="px-6 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
              >
                <option value="popular">Most Popular</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['all', 'medical', 'tourism', 'combo'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} 
                {filter === 'all' ? 'Packages' : filter === 'combo' ? 'Packages' : 'Only'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Package Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-white/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {pkg.isPopular && (
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </span>
                  )}
                  {pkg.isNew && (
                    <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      New
                    </span>
                  )}
                  {pkg.discount && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{pkg.discount}%
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(pkg.id)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(pkg.id) ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>

                {/* Price */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-bold text-gray-900">
                        ${pkg.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pkg.category === 'medical' 
                      ? 'bg-blue-100 text-blue-800'
                      : pkg.category === 'tourism'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {pkg.category === 'combo' ? 'Medical + Tourism' : pkg.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{pkg.rating}</span>
                    <span className="text-sm text-gray-500">({pkg.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {pkg.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {pkg.hospital}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </div>
                  ))}
                  {pkg.features.length > 3 && (
                    <div className="text-sm text-blue-600 font-medium">
                      +{pkg.features.length - 3} more features
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 group">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Health Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized recommendations from our medical tourism experts
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalTourismPackages;