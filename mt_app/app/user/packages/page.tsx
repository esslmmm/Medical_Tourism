'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Star, Users, Heart, Eye, Scissors, Baby, Calendar, Building2, FileText, Bed } from 'lucide-react';

// Types based on Prisma schema
interface Package {
  package_id: string;
  package_name: string;
  hospital_id: string;
  image: string;
  detail: string;
  duration: number;
  expired_date: string; // use string from API
  create_at: string; // use string from API
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
  category?: string;
  reviewCount?: number;
  popular?: boolean;
  badge?: string;
}

interface FilterState {
  category: string;
  duration: string;
  hospital: string;
}

const PackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    duration: 'all',
    hospital: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch from backend API
  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch("/api/services/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { value: 'Cardiology', label: 'Cardiology', icon: Heart, color: 'from-red-500 to-pink-500' },
    { value: 'Orthopedics', label: 'Orthopedics', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { value: 'Dentistry', label: 'Dentistry', icon: Users, color: 'from-green-500 to-teal-500' },
    { value: 'Fertility', label: 'Fertility', icon: Baby, color: 'from-purple-500 to-pink-500' },
    { value: 'Plastic Surgery', label: 'Plastic Surgery', icon: Scissors, color: 'from-orange-500 to-red-500' },
    { value: 'Ophthalmology', label: 'Ophthalmology', icon: Eye, color: 'from-cyan-500 to-blue-500' }
  ];

  // Filter logic
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch =
      pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.hospitals?.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.hospitals?.hospital_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filters.category === 'all' || pkg.category === filters.category;

    const matchesDuration =
      filters.duration === 'all' ||
      (filters.duration === 'short' && pkg.duration <= 7) ||
      (filters.duration === 'medium' && pkg.duration > 7 && pkg.duration <= 14) ||
      (filters.duration === 'long' && pkg.duration > 14);

    return matchesSearch && matchesCategory && matchesDuration;
  });

  const getCategoryData = (category: string) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  const isExpiringSoon = (expiredDate: string) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return new Date(expiredDate) <= thirtyDaysFromNow;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading packages...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
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

                  {/*CTA */}
                  <div className="flex items-center justify-between">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg">
                      View Details
                    </button>
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



