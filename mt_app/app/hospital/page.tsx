"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Building2,
  Award,
  Filter,
} from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  logo: string;
  image: string;
  location: string;
  city: string;
  rating: number;
  reviews?: number;
  description: string;
  phone: string;
  departments?: number;
}

const HospitalListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCity, setSelectedCity] = useState("all");

  const router = useRouter();

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const response = await fetch("/api/services/hospitals");
        if (!response.ok) throw new Error("Failed to fetch hospitals");

        const data = await response.json();

        const mapped: Hospital[] = data.map((h: any) => ({
          id: parseInt(h.hospital_id),
          name: h.name,
          logo: h.logo || "/api/placeholder/80/80",
          image: h.image || "/api/placeholder/300/200",
          location: h.location,
          city: h.city,
          rating: h.rating,
          reviews: Math.floor(Math.random() * 1000),
          description: h.description,
          phone: h.contact_info,
          departments: undefined,
        }));

        setHospitals(mapped);
      } catch (err) {
        setError("Error fetching hospitals. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHospitals();
  }, []);

  const navigateToHospitalPage = (hospitalId: number) => {
    router.push(`/user/Hospital/${hospitalId}`);
  };

  const itemsPerPage = 4;

  // ✅ Get unique city list
  const cities = ["all", ...Array.from(new Set(hospitals.map((h) => h.city)))];

  // ✅ Filtering hospitals
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity =
      selectedCity === "all" || hospital.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);
  const paginatedHospitals = filteredHospitals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ HospitalCard (same as yours)
  const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 mb-6">
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="lg:w-80 h-48 lg:h-auto relative overflow-hidden">
          {hospital.image ? (
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Building2 className="w-16 h-16 text-blue-600" />
            </div>
          )}
          {hospital.logo && (
            <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
              <img
                src={hospital.logo}
                alt="logo"
                className="w-12 h-12 object-contain"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {hospital.name}
                </h2>

                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-lg font-semibold text-gray-900">
                      {hospital.rating}
                    </span>
                  </div>
                  {hospital.reviews && (
                    <span className="text-gray-500">
                      ({hospital.reviews.toLocaleString()} รีวิว)
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      รับรองคุณภาพ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {hospital.location}
                </p>
                <p className="text-blue-600 font-medium">{hospital.city}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
              {hospital.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 bg-gray-50 rounded-lg px-4">
                
            {/* Add the important hospital if here ------------------------------------------------------------------------------------- */}
              {hospital.departments && (
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {hospital.departments}
                  </div>
                  <div className="text-sm text-gray-600">แผนก</div>
                </div>
              )}
              {hospital.phone && (
                <div className="text-center">
                  <div className="text-xl font-bold text-black-600">
                    {hospital.phone}
                  </div>
                  <div className="text-sm text-gray-600">โทรศัพท์</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-auto">
              <button
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                onClick={() => navigateToHospitalPage(hospital.id)}
              >
                ดูรายละเอียด
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">ค้นหาโรงพยาบาล</h1>
          <p className="text-blue-100">
            เลือกโรงพยาบาลที่เหมาะสมกับความต้องการของคุณ
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4">
        {/* Search + Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาชื่อโรงพยาบาล หรือพื้นที่..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="font-semibold mb-3">เลือกจังหวัด/เมือง</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setCurrentPage(1);
                    }}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCity === city
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {city === "all" ? "All" : city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Counter */}
          <div className="mt-4 text-sm text-gray-600">
            พบโรงพยาบาล {filteredHospitals.length} แห่ง
          </div>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-center text-gray-600">กำลังโหลดข้อมูล...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Hospital Cards */}
        {!loading && !error && (
          <div className="space-y-0">
            {paginatedHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              ไม่พบโรงพยาบาลที่ตรงกับการค้นหา
            </h3>
            <p className="text-gray-500">
              กรุณาลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกดคำ
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredHospitals.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 py-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>ก่อนหน้า</span>
            </button>

            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalListPage;
