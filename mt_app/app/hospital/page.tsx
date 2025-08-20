"use client"

import React, { useState } from 'react';
import { Search, MapPin, Star, ChevronLeft, ChevronRight, Building2, Phone, Award, Users } from 'lucide-react';

const HospitalListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  interface Hospital {
  id: number;
  name: string;
  nameEn: string;
  logo: string;
  image: string;
  location: string;
  city: string;
  rating: number;
  reviews: number;
  description: string;
  phone: string;
  established: string;
  departments: number;
  beds: number;
};

  const hospitals: Hospital[] = [
    {
      id: 1,
      name: 'โรงพยาบาลศิริราช',
      nameEn: 'Siriraj Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '2 ถนนวังหลาง แขวงศิริราช เขตบางกอกน้อย',
      city: 'กรุงเทพมหานคร',
      rating: 4.8,
      reviews: 1247,
      description: 'โรงพยาบาลของรัฐชั้นนำ ให้บริการทางการแพทย์ครบวงจร พร้อมแพทย์ผู้เชี่ยวชาญและเทคโนโลยีทางการแพทย์ที่ทันสมัย',
      phone: '02-419-7000',
      established: '2431',
      departments: 45,
      beds: 2100
    },
    {
      id: 2,
      name: 'โรงพยาบาลจุฬาลงกรณ์',
      nameEn: 'King Chulalongkorn Memorial Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '1873 ถนนพระรามสี่ แขวงปทุมวัน เขตปทุมวัน',
      city: 'กรุงเทพมหานคร',
      rating: 4.7,
      reviews: 923,
      description: 'โรงพยาบาลมหาวิทยาลัยชั้นนำที่มีศูนย์ความเป็นเลิศทางการแพทย์หลายสาขา พร้อมบริการรักษาแบบองค์รวม',
      phone: '02-256-4000',
      established: '2457',
      departments: 42,
      beds: 1400
    },
    {
      id: 3,
      name: 'โรงพยาบาลรามาธิบดี',
      nameEn: 'Ramathibodi Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '270 ถนนพระรามที่ 6 แขวงทุ่งพญาไท เขตราชเทวี',
      city: 'กรุงเทพมหานคร',
      rating: 4.9,
      reviews: 1456,
      description: 'โรงพยาบาลมหาวิทยาลัยมหิดล มีความเชี่ยวชาญด้านการแพทย์หลายสาขา โดยเฉพาะศัลยกรรมและอายุรกรรม',
      phone: '02-201-1100',
      established: '2512',
      departments: 38,
      beds: 1350
    },
    {
      id: 4,
      name: 'โรงพยาบาลบำรุงราษฎร์',
      nameEn: 'Bumrungrad International Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '33 ถนนสุขุมวิท 3 แขวงคลองเตยเหนือ เขตวัฒนา',
      city: 'กรุงเทพมหานคร',
      rating: 4.8,
      reviews: 2341,
      description: 'โรงพยาบาลเอกชนระดับสากล ให้บริการมาตรฐานสากล พร้อมแพทย์และพยาบาลที่ได้รับการรับรองระดับโลก',
      phone: '02-667-1000',
      established: '2523',
      departments: 55,
      beds: 580
    },
    {
      id: 5,
      name: 'โรงพยาบาลกรุงเทพ',
      nameEn: 'Bangkok Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '2 ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง',
      city: 'กรุงเทพมหานคร',
      rating: 4.6,
      reviews: 1876,
      description: 'โรงพยาบาลเครือข่ายกรุงเทพ ให้บริการทางการแพทย์ครบครัน พร้อมเทคโนโลยีทางการแพทย์ที่ทันสมัย',
      phone: '02-310-3000',
      established: '2515',
      departments: 48,
      beds: 720
    },
    {
      id: 6,
      name: 'โรงพยาบาลเซนต์หลุยส์',
      nameEn: 'Saint Louis Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '215 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร',
      city: 'กรุงเทพมหานคร',
      rating: 4.5,
      reviews: 654,
      description: 'โรงพยาบาลเอกชนที่มีประวัติยาวนาน เชี่ยวชาญด้านสูติศาสตร์-นรีเวชวิทยา และศัลยกรรม',
      phone: '02-675-5000',
      established: '2481',
      departments: 32,
      beds: 450
    },
    {
      id: 7,
      name: 'โรงพยาบาลพญาไท 2',
      nameEn: 'Phyathai 2 Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '943 ถนนพหลโยธิน แขวงสามเสนใน เขตพญาไท',
      city: 'กรุงเทพมหานคร',
      rating: 4.4,
      reviews: 892,
      description: 'โรงพยาบาลเอกชนที่มีความเชี่ยวชาญด้านการรักษาโรคหัวใจและหลอดเลือด รวมถึงบริการตรวจสุขภาพ',
      phone: '02-617-2444',
      established: '2530',
      departments: 35,
      beds: 550
    },
    {
      id: 8,
      name: 'โรงพยาบาลวิภาวดี',
      nameEn: 'Vibhavadi Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '51 ถนนวิภาวดีรังสิต แขวงลาดยาว เขตจตุจักร',
      city: 'กรุงเทพมหานคร',
      rating: 4.3,
      reviews: 567,
      description: 'โรงพยาบาลเอกชนที่ให้บริการทางการแพทย์ที่มีคุณภาพ พร้อมทีมแพทย์ผู้เชี่ยวชาญในสาขาต่างๆ',
      phone: '02-561-1111',
      established: '2535',
      departments: 28,
      beds: 380
    },
    {
      id: 9,
      name: 'โรงพยาบาลวิภาวดี',
      nameEn: 'Vibhavadi Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '51 ถนนวิภาวดีรังสิต แขวงลาดยาว เขตจตุจักร',
      city: 'กรุงเทพมหานคร',
      rating: 4.3,
      reviews: 567,
      description: 'โรงพยาบาลเอกชนที่ให้บริการทางการแพทย์ที่มีคุณภาพ พร้อมทีมแพทย์ผู้เชี่ยวชาญในสาขาต่างๆ',
      phone: '02-561-1111',
      established: '2535',
      departments: 28,
      beds: 380
    },
    {
      id: 10,
      name: 'โรงพยาบาลพญาไท 2',
      nameEn: 'Phyathai 2 Hospital',
      logo: '/api/placeholder/80/80',
      image: '/api/placeholder/300/200',
      location: '943 ถนนพหลโยธิน แขวงสามเสนใน เขตพญาไท',
      city: 'กรุงเทพมหานคร',
      rating: 4.4,
      reviews: 892,
      description: 'โรงพยาบาลเอกชนที่มีความเชี่ยวชาญด้านการรักษาโรคหัวใจและหลอดเลือด รวมถึงบริการตรวจสุขภาพ',
      phone: '02-617-2444',
      established: '2530',
      departments: 35,
      beds: 550
    },
  ];

  const itemsPerPage = 4;
  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.city.includes(searchTerm)
  );
  
  const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);
  const paginatedHospitals = filteredHospitals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 mb-6">
      <div className="flex flex-col lg:flex-row">
        {/* Hospital Image */}
        <div className="lg:w-80 h-48 lg:h-auto relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Building2 className="w-16 h-16 text-blue-600" />
          </div>
          {/* Logo overlay */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Hospital Info */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{hospital.name}</h2>
                <p className="text-gray-600 text-lg mb-2">{hospital.nameEn}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-lg font-semibold text-gray-900">{hospital.rating}</span>
                  </div>
                  <span className="text-gray-500">({hospital.reviews.toLocaleString()} รีวิว)</span>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">รับรองคุณภาพ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 leading-relaxed">{hospital.location}</p>
                <p className="text-blue-600 font-medium">{hospital.city}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
              {hospital.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 bg-gray-50 rounded-lg px-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{hospital.departments}</div>
                <div className="text-sm text-gray-600">แผนก</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{hospital.beds}</div>
                <div className="text-sm text-gray-600">เตียง</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{hospital.established}</div>
                <div className="text-sm text-gray-600">ก่อตั้ง พ.ศ.</div>
              </div>
              <div className="text-center">
              <div className="text-xl font-bold text-black-600">{hospital.phone}</div>
                <div className="text-sm text-gray-600">โทรศัพท์</div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-auto">

              
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  จองนัดหมาย
                </button>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  ดูรายละเอียด
                </button>
              </div>
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
          <p className="text-blue-100">เลือกโรงพยาบาลที่เหมาะสมกับความต้องการของคุณ</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
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
            
            {/* Search Info */}
            <div className="flex items-center text-gray-600">
              <Building2 className="w-5 h-5 mr-2" />
              <span>พบโรงพยาบาล {filteredHospitals.length} แห่ง</span>
            </div>
          </div>
        </div>

        {/* Hospital Cards */}
        <div className="space-y-0">
          {paginatedHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>

        {/* Empty State */}
        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">ไม่พบโรงพยาบาลที่ตรงกับการค้นหา</h3>
            <p className="text-gray-500">กรุณาลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกดคำ</p>
          </div>
        )}

        {/* Pagination */}
        {filteredHospitals.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 py-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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