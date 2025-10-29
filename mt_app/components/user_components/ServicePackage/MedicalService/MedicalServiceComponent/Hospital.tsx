import Image from 'next/image';
import Link from 'next/link';

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

const Hospital = () => {
    const displayedCenters = medical_service.hospital.centersAndClinics.slice(0, 3);
    const remainingCount = medical_service.hospital.centersAndClinics.length - 3;
  return (
    <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Hospital</h2>
            <div className="bg-white overflow-hidden">
              <Image
                src={medical_service.hospital.image}
                alt={medical_service.hospital.name}
                width={773}
                height={434}
                className="w-full object-cover rounded-lg"
              />
              <div className="pt-5">
                <h3 className="text-xl font-bold mb-4 text-black">{medical_service.hospital.name}</h3>
                <div className="mb-4">
                  <h4 className="font-bold mb-2 text-black">📍 Location</h4>
                  <p className="text-black">{medical_service.hospital.location.address}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold mb-3 text-black">🩺 Centers & Clinics</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayedCenters.map((center, index) => (
                      <span key={index} className="border bg-teal-500 px-3 py-1 rounded text-sm font-bold text-white">
                        {center}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span className="border bg-teal-500 px-3 py-1 rounded text-sm font-bold text-white">
                        +{remainingCount} centers
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={medical_service.hospital.detailLinkText}
                  className="inline-flex items-center gap-2 border border-teal-500 text-teal-500 font-semibold px-5 py-2.5 rounded-full shadow-md hover:text-white hover:bg-teal-600 transition-all duration-200"
                >
                  View More Details
                </Link>
              </div>
            </div>
          </div>
  )
}
export default Hospital