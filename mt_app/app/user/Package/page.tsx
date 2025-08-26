'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Clock, Star, Users, Heart, Eye, Scissors, Baby, Calendar, Building2, FileText, Camera, Route, Bed } from 'lucide-react';

// Types based on Prisma schema
interface Package {
  package_id: string;
  package_name: string;
  hospital_id: string;
  image: string;
  detail: string;
  duration: number;
  expired_date: Date;
  create_at: Date;
  // Relations
  hospitals?: {
    hospital_name: string;
    location: string;
    rating?: number;
  };
  package_image?: Array<{
    image_url: string;
  }>;
  description?: Array<{
    description_text: string;
  }>;
  package_hotels?: Array<{
    hotel_name: string;
  }>;
  package_guides?: Array<{
    guide_name: string;
  }>;
  package_doc?: Array<{
    document_name: string;
  }>;
  routes?: Array<{
    route_name: string;
  }>;
  // Additional fields for display
  category?: string;
  price?: number;
  originalPrice?: number;
  reviewCount?: number;
  popular?: boolean;
  badge?: string;
}

interface FilterState {
  category: string;
  priceRange: string;
  duration: string;
  hospital: string;
}

const PackagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    duration: 'all',
    hospital: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample package data matching Prisma schema
  const packages: Package[] = [
    {
      package_id: '1',
      package_name: 'Premium Cardiac Surgery Excellence',
      hospital_id: 'hosp_001',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      detail: 'Comprehensive cardiac care with world-class surgeons and state-of-the-art facilities',
      duration: 14,
      expired_date: new Date('2025-12-31'),
      create_at: new Date('2024-01-15'),
      hospitals: {
        hospital_name: 'Bangkok Heart Institute',
        location: 'Bangkok, Thailand',
        rating: 4.9
      },
      package_image: [
        { image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop' },
        { image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop' }
      ],
      description: [
        { description_text: 'World-class cardiac surgeons with 20+ years experience' },
        { description_text: 'State-of-the-art ICU monitoring and recovery suites' },
        { description_text: '24/7 multilingual nursing care and patient support' }
      ],
      package_hotels: [
        { hotel_name: 'Recovery Suites Bangkok' }
      ],
      package_guides: [
        { guide_name: 'Medical Coordinator Sarah' }
      ],
      category: 'Cardiology',
      price: 12500,
      originalPrice: 15000,
      reviewCount: 127,
      popular: true,
      badge: 'Most Popular'
    },
    {
      package_id: '2',
      package_name: 'Advanced Orthopedic Joint Replacement',
      hospital_id: 'hosp_002',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      detail: 'Complete joint replacement with rehabilitation and physiotherapy programs',
      duration: 10,
      expired_date: new Date('2025-11-30'),
      create_at: new Date('2024-02-20'),
      hospitals: {
        hospital_name: 'Istanbul Orthopedic Center',
        location: 'Istanbul, Turkey',
        rating: 4.8
      },
      package_image: [
        { image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop' }
      ],
      description: [
        { description_text: 'Advanced robotic-assisted joint replacement surgery' },
        { description_text: 'Comprehensive physiotherapy and rehabilitation program' },
        { description_text: 'Modern recovery facilities with patient amenities' }
      ],
      package_hotels: [
        { hotel_name: 'Medical Residences Istanbul' }
      ],
      package_guides: [
        { guide_name: 'Orthopedic Specialist Dr. Mehmet' }
      ],
      category: 'Orthopedics',
      price: 8500,
      originalPrice: 11000,
      reviewCount: 89
    },
    {
      package_id: '3',
      package_name: 'Complete Smile Transformation',
      hospital_id: 'hosp_003',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop',
      detail: 'Full dental makeover with implants, veneers, and cosmetic dentistry',
      duration: 7,
      expired_date: new Date('2025-10-31'),
      create_at: new Date('2024-03-10'),
      hospitals: {
        hospital_name: 'Dubai Dental Excellence',
        location: 'Dubai, UAE',
        rating: 4.7
      },
      package_image: [
        { image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop' }
      ],
      description: [
        { description_text: 'Digital smile design with 3D imaging technology' },
        { description_text: 'Premium dental implants and porcelain veneers' },
        { description_text: 'Luxury dental suite with panoramic city views' }
      ],
      package_hotels: [
        { hotel_name: 'Luxury Medical Hotel Dubai' }
      ],
      package_guides: [
        { guide_name: 'Dental Coordinator Fatima' }
      ],
      category: 'Dentistry',
      price: 4500,
      originalPrice: 6000,
      reviewCount: 203,
      badge: 'Best Value'
    },
    {
      package_id: '4',
      package_name: 'Comprehensive Fertility Program',
      hospital_id: 'hosp_004',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop',
      detail: 'Complete IVF program with genetic testing and counseling support',
      duration: 21,
      expired_date: new Date('2025-09-30'),
      create_at: new Date('2024-04-05'),
      hospitals: {
        hospital_name: 'Prague Fertility Institute',
        location: 'Prague, Czech Republic',
        rating: 4.9
      },
      package_image: [
        { image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop' }
      ],
      description: [
        { description_text: 'Advanced IVF treatment with genetic screening' },
        { description_text: 'Psychological counseling and support services' },
        { description_text: 'Follow-up care and monitoring programs' }
      ],
      package_hotels: [
        { hotel_name: 'Family Suites Prague' }
      ],
      package_guides: [
        { guide_name: 'Fertility Counselor Anna' }
      ],
      category: 'Fertility',
      price: 6800,
      reviewCount: 156
    },
    {
      package_id: '5',
      package_name: 'Premium Cosmetic Enhancement',
      hospital_id: 'hosp_005',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=250&fit=crop',
      detail: 'Advanced cosmetic surgery with Korean beauty standards and techniques',
      duration: 14,
      expired_date: new Date('2025-08-31'),
      create_at: new Date('2024-05-12'),
      hospitals: {
        hospital_name: 'Seoul Beauty Medical Center',
        location: 'Seoul, South Korea',
        rating: 4.8
      },
      package_image: [
        { image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=250&fit=crop' }
      ],
      description: [
        { description_text: 'Korean aesthetic surgery techniques and expertise' },
        { description_text: 'Luxury recovery facilities with spa amenities' },
        { description_text: 'Personal translator and cultural guide services' }
      ],
      package_hotels: [
        { hotel_name: 'Beauty Recovery Resort Seoul' }
      ],
      package_guides: [
        { guide_name: 'Beauty Consultant Min-ji' }
      ],
      category: 'Plastic Surgery',
      price: 9200,
      originalPrice: 12000,
      reviewCount: 94
    },
    {
      package_id: '6',
      package_name: 'Vision Correction Excellence',
      hospital_id: 'hosp_006',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop',
      detail: 'Advanced laser eye surgery with cutting-edge technology',
      duration: 5,
      expired_date: new Date('2025-07-31'),
      create_at: new Date('2024-06-18'),
      hospitals: {
        hospital_name: 'Singapore Eye Institute',
        location: 'Singapore',
        rating: 4.9
      },
      package_image: [
        { image_url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop' }
      ],
      description: [
        { description_text: 'Latest LASIK and PRK laser surgery technology' },
        { description_text: 'Comprehensive pre and post-operative care' },
        { description_text: 'Quick recovery with minimal downtime' }
      ],
      package_hotels: [
        { hotel_name: 'Medical Comfort Suites' }
      ],
      package_guides: [
        { guide_name: 'Vision Care Coordinator Lisa' }
      ],
      category: 'Ophthalmology',
      price: 3200,
      reviewCount: 167
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { value: 'Cardiology', label: 'Cardiology', icon: Heart, color: 'from-red-500 to-pink-500' },
    { value: 'Orthopedics', label: 'Orthopedics', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { value: 'Dentistry', label: 'Dentistry', icon: Users, color: 'from-green-500 to-teal-500' },
    { value: 'Fertility', label: 'Fertility', icon: Baby, color: 'from-purple-500 to-pink-500' },
    { value: 'Plastic Surgery', label: 'Plastic Surgery', icon: Scissors, color: 'from-orange-500 to-red-500' },
    { value: 'Ophthalmology', label: 'Ophthalmology', icon: Eye, color: 'from-cyan-500 to-blue-500' }
  ];

  // Filter packages based on search and filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.hospitals?.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.hospitals?.hospital_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === 'all' || pkg.category === filters.category;
    const matchesPrice = filters.priceRange === 'all' || 
                        (filters.priceRange === 'low' && pkg.price && pkg.price < 5000) ||
                        (filters.priceRange === 'medium' && pkg.price && pkg.price >= 5000 && pkg.price < 10000) ||
                        (filters.priceRange === 'high' && pkg.price && pkg.price >= 10000);
    const matchesDuration = filters.duration === 'all' ||
                           (filters.duration === 'short' && pkg.duration <= 7) ||
                           (filters.duration === 'medium' && pkg.duration > 7 && pkg.duration <= 14) ||
                           (filters.duration === 'long' && pkg.duration > 14);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
  });

  const getCategoryData = (category: string) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const isExpiringSoon = (expiredDate: Date) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiredDate <= thirtyDaysFromNow;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Medical Tourism Packages
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover world-class medical treatments combined with exceptional care and premium tourism experiences
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search packages, hospitals, or destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      <option value="all">All Prices</option>
                      <option value="low">Under $5,000</option>
                      <option value="medium">$5,000 - $10,000</option>
                      <option value="high">$10,000+</option>
                    </select>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (days)
                    </label>
                    <select
                      value={filters.duration}
                      onChange={(e) => setFilters({...filters, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      <option value="all">Any Duration</option>
                      <option value="short">1-7 days</option>
                      <option value="medium">8-14 days</option>
                      <option value="long">15+ days</option>
                    </select>
                  </div>

                  {/* Hospital Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital
                    </label>
                    <select
                      value={filters.hospital}
                      onChange={(e) => setFilters({...filters, hospital: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      <option value="all">All Hospitals</option>
                      {Array.from(new Set(packages.map(p => p.hospitals?.hospital_name))).map(hospital => (
                        <option key={hospital} value={hospital || ''}>{hospital}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredPackages.length} Medical Packages Available
          </h2>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const categoryData = getCategoryData(pkg.category || 'all');
            const IconComponent = categoryData.icon;
            return (
              <div
                key={pkg.package_id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.package_name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {pkg.badge && (
                      <div className={`bg-gradient-to-r ${categoryData.color} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                        {pkg.badge}
                      </div>
                    )}
                    {isExpiringSoon(pkg.expired_date) && (
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Limited Time
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <IconComponent className={`w-5 h-5 bg-gradient-to-r ${categoryData.color} bg-clip-text text-transparent`} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-sm font-medium text-white bg-gradient-to-r ${categoryData.color} px-3 py-1 rounded-full shadow-sm`}>
                      {pkg.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {pkg.package_name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {pkg.detail}
                  </p>

                  {/* Hospital Info */}
                  <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{pkg.hospitals?.hospital_name}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {pkg.hospitals?.location}
                      </div>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>{pkg.duration} days</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span>Until {formatDate(pkg.expired_date)}</span>
                    </div>
                    {pkg.package_hotels && pkg.package_hotels.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Bed className="w-4 h-4 text-purple-600" />
                        <span>Hotel included</span>
                      </div>
                    )}
                    {pkg.package_guides && pkg.package_guides.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-pink-600" />
                        <span>Guide included</span>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  {pkg.hospitals?.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{pkg.hospitals.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">({pkg.reviewCount} reviews)</span>
                    </div>
                  )}

                  {/* Features */}
                  {pkg.description && pkg.description.length > 0 && (
                    <div className="mb-6">
                      <div className="space-y-1">
                        {pkg.description.slice(0, 2).map((desc, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{desc.description_text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {pkg.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                            ${pkg.price.toLocaleString()}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${pkg.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="text-xs text-gray-600">Starting price</div>
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg">
                      View Details
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>ID: {pkg.package_id.slice(0, 8)}...</span>
                      </div>
                      <div>
                        Created: {formatDate(pkg.create_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find more packages.</p>
          </div>
        )}
      </div>

      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-300">Successful Treatments</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-300">Partner Hospitals</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                25+
              </div>
              <div className="text-gray-300">Countries Served</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                4.8★
              </div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;