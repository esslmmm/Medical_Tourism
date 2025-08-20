"use client"

import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, User, MapPin} from 'lucide-react';

const DoctorListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const specializations = [
    { id: 'all', name: 'ทุกสาขา', nameEn: 'All Specializations' },
    { id: 'cardiology', name: 'อายุรศาสตร์', nameEn: 'Internal Medicine' },
    { id: 'surgery', name: 'ศัลยกรรม', nameEn: 'Surgery' },
    { id: 'orthopedics', name: 'กระดูกและข้อ', nameEn: 'Orthopedics' },
    { id: 'neurology', name: 'ระบบประสาท', nameEn: 'Neurology' },
    { id: 'dermatology', name: 'ผิวหนัง', nameEn: 'Dermatology' },
    { id: 'gynecology', name: 'สูตินรีเวช', nameEn: 'Gynecology' },
    { id: 'pediatrics', name: 'กุมารเวช', nameEn: 'Pediatrics' },
    { id: 'ophthalmology', name: 'จักษุ', nameEn: 'Ophthalmology' }
  ];

  interface Doctor {
  id: number;
  name: string;
  nameEn: string;
  specialization: string;
  specializationEn: string;
  image: string;
  hospital: string;
  category: string;
}


  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'นพ. มาโนช เตชะโชควิวัฒน์',
      nameEn: 'Dr. Manoch Techachokvivat',
      specialization: 'อายุรศาสตร์',
      specializationEn: 'Internal Medicine',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลศิริราช',
      category: 'cardiology'
    },
    {
      id: 2,
      name: 'พญ. วลัยลักษณ์ เกรียงไกรนาค',
      nameEn: 'Dr. Walailak Kriangkrainark',
      specialization: 'สูตินรีเวช',
      specializationEn: 'Gynecology',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลบำรุงราษฎร์',
      category: 'gynecology'
    },
    {
      id: 3,
      name: 'นพ. วิรุฬห์ นิติเก้ือกูล',
      nameEn: 'Dr. Wiroon Nitikuekul',
      specialization: 'ศัลยศาสตร์กระดูกและข้อ',
      specializationEn: 'Orthopedic Surgery',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลเซนต์หลุยส์',
      category: 'orthopedics'
    },
    {
      id: 4,
      name: 'ศ.พบ. สมบูรณ์ คณาจักร',
      nameEn: 'Prof. Somboon Kanajak',
      specialization: 'เวชศาสตร์ครอบครัว',
      specializationEn: 'Family Medicine',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลจุฬาลงกรณ์',
      category: 'cardiology'
    },
    {
      id: 5,
      name: 'พญ. กาญจนา เสรีสวรรค์',
      nameEn: 'Dr. Kanjana Sereesawan',
      specialization: 'ตจวิทยา',
      specializationEn: 'Dermatology',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลรามาธิบดี',
      category: 'dermatology'
    },
    {
      id: 6,
      name: 'นพ. ชาติกบิน ยอดดวงปี',
      nameEn: 'Dr. Chatikabin Yotduangpee',
      specialization: 'อายุรศาสตร์โรคหัวใจ',
      specializationEn: 'Cardiology',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลกรุงเทพ',
      category: 'cardiology'
    },
    {
      id: 7,
      name: 'ศ.พบ. สมบูรณ์ คณาจักร',
      nameEn: 'Prof. Somboon Kanajak',
      specialization: 'เวชศาสตร์ครอบครัว',
      specializationEn: 'Family Medicine',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลจุฬาลงกรณ์',
      category: 'cardiology'
    },
    {
      id: 8,
      name: 'พญ. กาญจนา เสรีสวรรค์',
      nameEn: 'Dr. Kanjana Sereesawan',
      specialization: 'ตจวิทยา',
      specializationEn: 'Dermatology',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลรามาธิบดี',
      category: 'dermatology'
    },
    {
      id: 9,
      name: 'นพ. ชาติกบิน ยอดดวงปี',
      nameEn: 'Dr. Chatikabin Yotduangpee',
      specialization: 'อายุรศาสตร์โรคหัวใจ',
      specializationEn: 'Cardiology',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลกรุงเทพ',
      category: 'cardiology'
    },
    {
      id: 10,
      name: 'นพ. มาโนช เตชะโชควิวัฒน์',
      nameEn: 'Dr. Manoch Techachokvivat',
      specialization: 'อายุรศาสตร์',
      specializationEn: 'Internal Medicine',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลศิริราช',
      category: 'cardiology'
    },
    {
      id: 11,
      name: 'พญ. วลัยลักษณ์ เกรียงไกรนาค',
      nameEn: 'Dr. Walailak Kriangkrainark',
      specialization: 'สูตินรีเวช',
      specializationEn: 'Gynecology',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลบำรุงราษฎร์',
      category: 'gynecology'
    },
    {
      id: 12,
      name: 'นพ. วิรุฬห์ นิติเก้ือกูล',
      nameEn: 'Dr. Wiroon Nitikuekul',
      specialization: 'ศัลยศาสตร์กระดูกและข้อ',
      specializationEn: 'Orthopedic Surgery',
      image: '/api/placeholder/150/150',
      hospital: 'โรงพยาบาลเซนต์หลุยส์',
      category: 'orthopedics'
    },
  ];


  const itemsPerPage = 9;
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.includes(searchTerm);
    const matchesSpecialization = selectedSpecialization === 'all' || doctor.category === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
              <User className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{doctor.nameEn}</p>
            <div className="flex items-center space-x-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                {doctor.specialization}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{doctor.hospital}</span>
          </div>

          

        </div>

        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">ค้นหาแพทย์</h1>
          <p className="text-blue-100">ค้นหาแพทย์ที่เหมาะสมกับความต้องการของคุณ</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาชื่อแพทย์ หรือสาขาความเชี่ยวชาญ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              <h3 className="font-semibold mb-3">เลือกสาขาความเชี่ยวชาญ</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {specializations.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpecialization(spec.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                      selectedSpecialization === spec.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {spec.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Counter */}
          <div className="mt-4 text-sm text-gray-600">
            พบแพทย์ {filteredDoctors.length} ท่าน
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">ไม่พบแพทย์ที่ตรงกับการค้นหา</h3>
            <p className="text-gray-500">กรุณาลองค้นหาด้วยคำอื่น หรือเปลี่ยนตัวกรอง</p>
          </div>
        )}

        {/* Pagination */}
        {filteredDoctors.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 pb-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ก่อนหน้า</span>
            </button>

            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorListPage;