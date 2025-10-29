import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const medical_service = {
  name: 'Medical Check-up',
  images: [
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test3.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test4.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
  ],
  description: 'Ran-Tong is devoted to rescuing abused elephants from all over Thailand and surrounding countries...',
  services: [
    'Comprehensive dental examination',
    'Follow-up consultations',
    'Dental implants (if required)',
    'Cosmetic dental procedures',
    'Professional teeth cleaning'
  ],
  hospital: {
    name: "Bangkok Hospital Phuket",
    image: "/img/Homepage/Test.jpg",
    location: {
      address: "Hongyok, Hongyokutis Rd, Taladyai, Muang, Phuket, Thailand",
      city: "Phuket",
      country: "Thailand"
    },
    centersAndClinics: [
      "Oncology",
      "Cardiovascular",
      "Neuroscience",
      "Bone",
      "Colorectal Deseases",
      "Brain",
    ],
    detailLinkText: "/user/Hospital/745f7b01-f313-40bb-8c45-8568a544e03d"
  },
  available_languages: [
    { language: 'Saudi Arabia', flag: '🇸🇦' },
    { language: 'Qatar', flag: '🇶🇦' },
    { language: 'Myanmar', flag: '🇲🇲' }
  ],
  reviews:[
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      date: 'August 2025',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Qatar',
      flag: '🇶🇦',
      date: 'August 2025',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Wunna Kaungmyat',
      profile: '/img/Homepage/Test.jpg',
      country: 'Myanmar',
      flag: '🇲🇲',
      date: 'August 2025',
      rating: 4,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    }
  ]
};

const Images = () => {

const previewImages = medical_service.images.slice(0, 3);
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    medical_service.images.length > 0 ? medical_service.images[0] : null
  );
  const remainingImages = medical_service.images.slice(3);
  return (
    <div>
        <div className="mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
                  <div className="lg:col-span-2 relative">
                    <Image
                      src={previewImages[0].url}
                      alt={previewImages[0].alt}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover rounded-l-2xl"
                    />
                  </div>
        
                  <div className="flex flex-col gap-4 relative">
                    {previewImages.slice(1, 3).map((img, i) => (
                      <div key={i} className="relative">
                        <Image
                          src={img.url}
                          alt={img.alt}
                          width={400}
                          height={200}
                          className={`w-full h-full object-cover ${
                            i === 0 ? "rounded-tr-2xl" : "rounded-br-2xl"
                          }`}
                        />
                        {i === 1 && remainingImages.length > 0 && (
                          <button
                            onClick={() => setShowAll(true)}
                            className="absolute bottom-4 right-4 bg-white bg-opacity-50 text-teal-500 px-3 py-1 rounded border-teal-500 border text-sm font-bold hover:bg-opacity-70 hover:text-white hover:bg-teal-500 transition"
                          >
                            See all photos
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
        
                {/* Modal */}
                {showAll && (
                  <div className="fixed inset-0 backdrop-blur-xs bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-5xl w-full relative overflow-y-auto max-h-[90vh] border border-gray-300">
                      <button
                        onClick={() => setShowAll(false)}
                        className="absolute top-3 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        <X className=" w-8 h-8 " />
                      </button>
        
                      <h2 className="text-xl font-semibold mb-4 text-black">All Photos</h2>
        
                      {selectedImage && (
                        <div className="mb-4 w-full flex justify-center">
                          <Image
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            width={600}
                            height={400}
                            className="w-full max-w-3xl h-auto object-cover rounded-lg"
                          />
                        </div>
                      )}
        
                      <div className="flex gap-4 overflow-x-auto py-2">
                        {medical_service.images.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedImage(img)}
                            className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                              selectedImage!.url === img.url
                                ? "border-teal-500"
                                : "border-transparent"
                            }`}
                          >
                            <Image
                              src={img.url}
                              alt={img.alt}
                              width={150}
                              height={100}
                              className="w-[150px] h-auto object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
    </div>
  )
}
export default Images