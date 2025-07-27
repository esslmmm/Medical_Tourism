// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (optional - be careful in production)
  console.log('🧹 Cleaning existing data...')
  await prisma.review_inter.deleteMany()
  await prisma.review_hotel.deleteMany()
  await prisma.review_hospital.deleteMany()
  await prisma.package_bookings.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.appointmentFile.deleteMany()
  await prisma.appointments.deleteMany()
  await prisma.patient_details.deleteMany()
  await prisma.room_aggregate.deleteMany()
  await prisma.hotel_bookings.deleteMany()
  await prisma.inter_bookings.deleteMany()
  await prisma.tourism_bookings.deleteMany()
  await prisma.file.deleteMany()
  await prisma.user_contact_detail.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Users
  console.log('👥 Creating users...')
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        nationality: 'American',
        role: 'customer',
        is_email_verified: true,
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-15'),
      }
    }),
    prisma.user.create({
      data: {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        nationality: 'Spanish',
        role: 'customer',
        is_email_verified: true,
        createdAt: new Date('2025-01-20'),
        updatedAt: new Date('2025-01-20'),
      }
    }),
    prisma.user.create({
      data: {
        id: 3,
        name: 'David Kim',
        email: 'david.kim@example.com',
        nationality: 'Korean',
        role: 'customer',
        is_email_verified: true,
        createdAt: new Date('2025-02-01'),
        updatedAt: new Date('2025-02-01'),
      }
    }),
    prisma.user.create({
      data: {
        id: 10,
        name: 'SONDETH BOUNPHANITH',
        email: '6531501229@lamduan.mfu.ac.th',
        image: 'https://lh3.googleusercontent.com/a-/ALV-UjWQTD6KBU9bes0RrGnIoYHnpkVUVndxPDIWphfe8vkM1ahrPqmaf0aTUvULmcZ4vpkPqL0u5Y6pXnq2QyaoZqjRz_B3xKF5T3F6QAoLMvYjDZZKb-UOI8t1hIXr9_3XNy8vI6h_VReoCH5cU3ZKv-sg2t2DiUOwXGPBpS6kMGeI6YDfKPEMAXWNJfE50obFu7FYo0jprWwxsGdyDpzqPQpcGGgtQWiq2D4taNndr6KmpI05Dav9TrkaACMCV7CVNzx9omWUBjp1h52FWyFxbC5DFNX7BHT7_zqPJJffhtkZNZ6V-YzKBx7Fhsvt4g1Iq8h6euSl_4TZgvFXPf9PIpVqFnHTLRu025hGZonAqS8js5ByV0Ehm1pHK0yEexLhnpN8ARuVEMSfjkdi4O9eI6SuisBGmY1pOsrNDgR5_BVcaMxT6wNSswl4Bk3wZKB9q6XLTIUT5JLgqu0ZclFNORMuANh6qoHn4v_jcpUNw-EOp2Qr36Ujg3moO_6OnZQIwZCVlkso87DHhiDo7xUr_tYqaz07J2aQ7s6yfKzzj_b6Y4uXq8G2bQ4np8yWuBTaK2ZM4NbtU-U4201REQZ8a96e-tFi6OMz48d-ZEi69k5vJ0rq-CIp6w1iLMcNehEJVEtiQs5yRElkdXUbHCU6MQmA9CGHfyKJOKIB5tj8cqyI4MpyAdQnzEc5Ab35Dd6G4KYeyIW07buyqFnSMA05rtXvKLVgSc_gYwtNBYFsj4q-Yxh6c8sYTD0Ti3Ahgx4KcmjysgGISije0PSMknB6iErsqLhkazXnXpWnGryQmn2SL_I1P8JuLCgOrwixyIJQJOTDbbmyQ6wTjkPE1V5GAzd-_cyl36JlJJWhSyUUYdfxEHe6i2fNSvn2c0wMdI0Z2HNKz3qc2r9ZaCyRxWWcjs57ssiUO7Uz5ttI5dpmeTo-CYeHEX1ItS8GiLIHrsguac3tA8AWzKM7VRZMPoZHv8eGWSy28Q=s96-c',
        role: 'customer',
        is_email_verified: true,
        createdAt: new Date('2025-07-10'),
        updatedAt: new Date('2025-07-17'),
      }
    }),
    prisma.user.create({
      data: {
        id: 12,
        name: 'Sondeth Bounphanith',
        email: 'sondeth.bpn@gmail.com',
        image: 'https://lh3.googleusercontent.com/a/ACg8ocJwqcH0SNo7RJ76Elyj7mFM5nTc8VsIX-hmjzVgWSAqvLkhHZA=s96-c',
        role: 'customer',
        is_email_verified: true,
        createdAt: new Date('2025-07-10'),
        updatedAt: new Date('2025-07-17'),
      }
    })
  ])

  // 2. Create Hospitals
  console.log('🏥 Creating hospitals...')
  const hospitals = await Promise.all([
    prisma.hospitals.create({
      data: {
        hospital_id: '1',
        name: 'MAE FAH LUANG MEDICAL CENTER HOSPITAL',
        hospital_code: 'MF55002',
        location: '365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100',
        city: 'Chiang rai',
        description: 'MAE FAH LUANG MEDICAL CENTER HOSPITAL was established in 1972 as one of the first private hospitals in Thailand. Over the past 50 years, we have expanded our operations to become a tertiary care facility with dedicated hospitals for cancer and cardiology.',
        contact_info: '+6605154514',
        rating: 5,
        image: '/img/Homepage/Mfu.jpg',
        logo: '',
        create_at: new Date('2025-03-13'),
      }
    }),
    prisma.hospitals.create({
      data: {
        hospital_id: '15',
        name: 'Tokyo General Hospital',
        hospital_code: 'TG123',
        location: 'Tokyo, Japan',
        city: 'Tokyo',
        description: 'A leading hospital in Tokyo',
        contact_info: '+81 123-456-7890',
        rating: 4.8,
        image: '/img/Hospital/Mfu3.jpg',
        logo: '/img/Hospital/bangkok_logo.png',
        create_at: new Date('2025-03-14'),
      }
    }),
    prisma.hospitals.create({
      data: {
        hospital_id: '2',
        name: 'Bangkok International Hospital',
        hospital_code: 'HSP123',
        location: 'Updated Street 45',
        city: 'Bangkok',
        description: 'A top-tier medical facility.',
        contact_info: '+1 234 567 890',
        rating: 5,
        image: '/img/Hospital/Mfu2.jpg',
        logo: '',
        create_at: new Date('2025-03-13'),
      }
    })
  ])

  // 3. Create Medical Services
  console.log('⚕️ Creating medical services...')
  const medicalServices = [
    'Heart', 'Cancer', 'Bone', 'Brain', 'Trauma', 'Check-up', 
    'Surgery', 'Dental', 'Child', 'Aesthetic', 'Eye & ENT', 'Other'
  ]
  
  for (let i = 0; i < medicalServices.length; i++) {
    await prisma.medical_services.create({
      data: {
        service_id: 18 + i,
        hospital_id: '1',
        service_name: medicalServices[i],
        description: `Professional ${medicalServices[i].toLowerCase()} treatment service`,
      }
    })
  }

  // 4. Create Doctors
  console.log('👨‍⚕️ Creating doctors...')
  const doctors = await Promise.all([
    prisma.doctors.create({
      data: {
        doctor_id: '3',
        name: 'Dr. Sithiphol Chinnapongse',
        specialization: 'Dermatology',
        hospital_id: '15',
        experience: 5,
        description: 'Dermatologist specializes in skin conditions and aesthetics, including skin allergies and inflammation',
        image: '/img/DoctorList/doctor4.png',
        create_at: new Date('2025-03-02'),
      }
    }),
    prisma.doctors.create({
      data: {
        doctor_id: '4',
        name: 'Dr. Valailuck Klatthanakorn',
        specialization: 'Thoracic Surgery',
        hospital_id: '1',
        experience: 8,
        description: 'Experienced thoracic surgeon specializing in chest and lung procedures',
        image: '/img/DoctorList/doctor2.png',
        create_at: new Date('2025-03-01'),
      }
    }),
    prisma.doctors.create({
      data: {
        doctor_id: '5',
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiology',
        hospital_id: '1',
        experience: 12,
        description: 'Expert cardiologist with extensive experience in heart disease treatment',
        image: '/img/DoctorList/doctor3.png',
        create_at: new Date('2025-02-15'),
      }
    })
  ])

  // 5. Create Doctor Education
  console.log('🎓 Creating doctor education...')
  await prisma.doc_education.createMany({
    data: [
      {
        education_id: 6,
        doctor_id: '3',
        field_of_study: 'Master of Business Administration (Executive),Sasin Graduate Institute of Business Administration',
        institution: 'Chulalongkorn University, Thailand',
        year: 2016,
      },
      {
        education_id: 7,
        doctor_id: '3',
        field_of_study: 'Internal Medicine',
        institution: 'Thai Medical Council, Thailand',
        year: 2003,
      },
      {
        education_id: 8,
        doctor_id: '4',
        field_of_study: 'Thoracic Surgery',
        institution: 'Johns Hopkins University, USA',
        year: 2010,
      }
    ]
  })

  // 6. Create Doctor Languages
  console.log('🗣️ Creating doctor languages...')
  await prisma.doc_language.createMany({
    data: [
      { language_id: 4, doctor_id: '3', languages: 'Thai' },
      { language_id: 5, doctor_id: '3', languages: 'English' },
      { language_id: 6, doctor_id: '4', languages: 'Thai' },
      { language_id: 7, doctor_id: '4', languages: 'English' },
      { language_id: 8, doctor_id: '5', languages: 'English' },
    ]
  })

  // 7. Create Hotels
  console.log('🏨 Creating hotels...')
  const hotel = await prisma.hotels.create({
    data: {
      hotel_id: 1,
      name: 'The Heritage Chiang Rai Hotel and Convention',
      hotel_code: 'AZ3901',
      location: '65 Moo 4, Mai Khao Soi 4, Mai Khao, Phuket 83110, Thailand',
      city: 'Chiang rai',
      rating: 5,
      email: 'info@heritage-chiangrai.com',
      description: 'Splash Beach Resort, nestled beside Mai Khao Beach, offers group travelers the thrill of Splash Jungle Water Park. The expansive pillarless ballroom, set amidst lush gardens, is perfect for events, combining adventure with tranquility.',
      image: '/img/room1.png',
      check_in_time: '1 PM',
      contact_info: '+66 0712959423',
      create_at: new Date('2025-03-16'),
    }
  })

  // 8. Create Hotel Facilities
  console.log('🏊‍♂️ Creating hotel facilities...')
  const hotelFacilities = [
    'Free fitness center access',
    'Book and pay now',
    'Good breakfast included',
    'Non-refundable (Low price!)',
    'Free WiFi'
  ]

  for (let i = 0; i < hotelFacilities.length; i++) {
    await prisma.hotel_facilities.create({
      data: {
        facility_id: i + 1,
        hotel_id: 1,
        facility_name: hotelFacilities[i],
        description: null,
      }
    })
  }

  // 9. Create Hotel Rooms
  console.log('🛏️ Creating hotel rooms...')
  const room = await prisma.hotel_rooms.create({
    data: {
      room_id: 2,
      hotel_id: 1,
      room_type: 'Deluxe Twins',
      price_per_night: 5890,
      capacity: '4',
      description: 'Medium Room',
      image: '/img/room1.png',
    }
  })

  // 10. Create Room Facilities
  console.log('🛁 Creating room facilities...')
  const roomFacilities = [
    '🛏 2 single beds',
    '📏 Room size: 30 m² / 323 ft²',
    '🌆 City view',
    '🚭 Non-smoking',
    '🚿 Shower'
  ]

  for (let i = 0; i < roomFacilities.length; i++) {
    await prisma.hotel_room_facilities.create({
      data: {
        room_facilitiy_id: i + 1,
        room_id: 2,
        facility_name: roomFacilities[i],
        description: null,
      }
    })
  }

  // 11. Create Room Images
  console.log('📸 Creating room images...')
  const roomImages = ['/img/room2.png', '/img/room3.png', '/img/room1.png']
  for (let i = 0; i < roomImages.length; i++) {
    await prisma.room_image.create({
      data: {
        image_id: i + 1,
        image: roomImages[i],
        room_id: 2,
      }
    })
  }

  // 12. Create Places
  console.log('🗺️ Creating places...')
  const places = await Promise.all([
    prisma.places.create({
      data: {
        place_id: '1',
        place_name: 'Khun Korn Waterfall',
        contact_info: '+66 038759854',
        location: 'หลวงหมายเลข 1208 Mae Kon, Mueang Chiang Rai District, Chiang Rai 57000, Thailand',
        city: 'Chiang rai',
        image: '/img/Places/khunkorn.png',
        description: 'Waterfall with a shallow pool, accessible via a trail through bamboo trees & tropical vegetation.',
        fee: 60,
      }
    }),
    prisma.places.create({
      data: {
        place_id: '2',
        place_name: 'Wat Rong Khun',
        contact_info: '+66 0358885857',
        location: 'Pa O Don Chai, Mueang Chiang Rai District, Chiang Rai 57000, Thailand',
        city: 'Chiang rai',
        image: '/img/Places/Wat_Rong_Khun.jpg',
        description: 'Wat Rong Khun, better known as the White Temple, is a Buddhist temple in Pa O Don Chai, Mueang District, Chiang Rai province, northern Thailand.',
        fee: 100,
      }
    }),
    prisma.places.create({
      data: {
        place_id: '3',
        place_name: 'Ko Phi Phi Lee',
        contact_info: '+66 0328487477',
        location: 'Ao Nang, Mueang Krabi District, Krabi, Thailand',
        city: 'Krabi',
        image: '/img/Places/ppisland.jpg',
        description: 'The Phi Phi Islands are an island group in Thailand between the large island of Krabi and the Straits of Malacca coast of Thailand.',
        fee: 250,
      }
    }),
    prisma.places.create({
      data: {
        place_id: '4',
        place_name: 'Singha Park Chiang Rai',
        contact_info: '+66 91 576 0374',
        location: '99, Mae Kon, Mueang Chiang Rai District, Chiang Rai 57000, Thailand',
        city: 'Chiang rai',
        image: '/img/Places/singha-park.jpg',
        description: 'Scenic park in a farmlike setting with tea plantations, orchards, trails, a tram & a petting zoo.',
        fee: 40,
      }
    })
  ])

  // 13. Create Interpreters
  console.log('🗣️ Creating interpreters...')
  const interpreters = await Promise.all([
    prisma.interpreters.create({
      data: {
        interpreter_id: 1,
        name: 'Duygu Muhurdar',
        email: 'Duygu.mhd@gmail.com',
        phone: '+66 568484',
        rating: 4,
        nationality: 'UK',
        image: '/img/Interpreter/interpreter1.png',
        birthofday: new Date('2015-03-07'),
        experience: new Date('2019-02-01'),
        address: 'Istanbul, Turkey',
        profile_summary: 'I am Duygu, a Music Programmer, Booking Agent, and an Ethnomusicologist. I\'ve been working within the Music Industry with an experience close to a decade now as a booker, live event producer, singer and music writer.',
        language: 'English',
        create_at: new Date('2025-03-16'),
      }
    }),
    prisma.interpreters.create({
      data: {
        interpreter_id: 6,
        name: 'Vanessa Leiva',
        email: 'vanessa.leiva@gmail.com',
        phone: '+66 555123',
        rating: 3,
        nationality: 'Spanish',
        image: '/img/Interpreter/interpreter2.png',
        birthofday: new Date('1985-03-01'),
        experience: new Date('2020-02-02'),
        address: 'Madrid, Spain',
        profile_summary: 'Professional Arabic interpreter with extensive experience in medical and legal translation.',
        language: 'Arabic',
        create_at: new Date('2025-03-18'),
      }
    }),
    prisma.interpreters.create({
      data: {
        interpreter_id: 7,
        name: 'Sek Han Foo',
        email: 'sekhan.foo@gmail.com',
        phone: '+66 525545',
        rating: 4,
        nationality: 'Chinese',
        image: '/img/Interpreter/interpreter3.png',
        birthofday: new Date('1990-03-02'),
        experience: new Date('2018-02-02'),
        address: 'Beijing, China',
        profile_summary: 'Experienced Burmese interpreter specializing in medical tourism and business translation.',
        language: 'Burmese',
        create_at: new Date('2025-03-18'),
      }
    })
  ])

  // 14. Create Interpreter Education
  console.log('🎓 Creating interpreter education...')
  await prisma.inter_education.createMany({
    data: [
      {
        education_id: 7,
        interpreter_id: 1,
        degree: 'Bachelor',
        field_of_study: 'M.M.: Ethnomusicology\r\nCoursework in Ethnomusicology and Music Business',
        institution: 'İstanbul Technical University',
      },
      {
        education_id: 8,
        interpreter_id: 1,
        degree: 'Certificate',
        field_of_study: 'Jazz Studies',
        institution: 'Bahçeşehir University - İstanbul',
      }
    ]
  })

  // 15. Create Languages for Interpreters
  console.log('🌐 Creating interpreter languages...')
  await prisma.languages.createMany({
    data: [
      { lang_id: 4, interpreter_id: 1, language_name: 'English', proficiency: 'Fluent' },
      { lang_id: 5, interpreter_id: 1, language_name: 'Turkish', proficiency: 'Native' },
      { lang_id: 6, interpreter_id: 6, language_name: 'Arabic', proficiency: 'Native' },
      { lang_id: 7, interpreter_id: 6, language_name: 'Spanish', proficiency: 'Native' },
      { lang_id: 8, interpreter_id: 7, language_name: 'Burmese', proficiency: 'Native' },
      { lang_id: 9, interpreter_id: 7, language_name: 'Chinese', proficiency: 'Native' },
    ]
  })

  // 16. Create Packages
  console.log('📦 Creating packages...')
  const packages = await Promise.all([
    prisma.packages.create({
      data: {
        package_id: '11',
        package_name: 'Luxury Medical Package',
        package_type: 'Medical_Tourism',
        hospital_id: '1',
        image: '/img/Packages/medical4.png',
        detail: 'A premium medical package with top-tier services.',
        duration: 7,
        expired_date: new Date('2025-12-31'),
        create_at: new Date('2025-03-18'),
      }
    }),
    prisma.packages.create({
      data: {
        package_id: '12',
        package_name: 'Standard Health Checkup',
        package_type: 'Medical_Service_Only',
        hospital_id: '1',
        image: '/img/Packages/medical2.png',
        detail: 'Comprehensive health screening package.',
        duration: 3,
        expired_date: new Date('2025-12-31'),
        create_at: new Date('2025-03-17'),
      }
    })
  ])

  // 17. Create Package Descriptions
  console.log('📝 Creating package descriptions...')
  const descriptions = [
    {
      title: 'ECG and chest X-ray',
      details: 'An ECG measures the heart\'s electrical activity, while a chest X-ray provides an image of the heart, lungs, and surrounding structures.'
    },
    {
      title: 'Physical examination',
      details: 'a comprehensive assessment of a patient\'s overall health conducted by a healthcare provider.'
    },
    {
      title: 'General health screening',
      details: 'a comprehensive checkup designed to assess your overall health and identify potential health issues before symptoms appear.'
    },
    {
      title: 'Consultation and health report',
      details: 'A health consultation is a meeting between a patient and a healthcare professional to discuss health concerns, symptoms, or treatment options.'
    },
    {
      title: 'Ultrasound or other diagnostic tests',
      details: 'Ultrasound is a non-invasive imaging method that uses sound waves to visualize internal organs, blood vessels, and other soft tissues.'
    }
  ]

  for (let i = 0; i < descriptions.length; i++) {
    await prisma.description.create({
      data: {
        description_id: i + 1,
        package_id: '11',
        details: descriptions[i].details,
        title: descriptions[i].title,
      }
    })
  }

  // 18. Create Package-Doctor relationships
  console.log('👨‍⚕️ Creating package-doctor relationships...')
  await prisma.package_doc.createMany({
    data: [
      { doc_id: 6, package_id: '11', doctor_id: '3' },
      { doc_id: 7, package_id: '11', doctor_id: '4' },
      { doc_id: 8, package_id: '12', doctor_id: '5' },
    ]
  })

  // 19. Create Package-Hotel relationships
  console.log('🏨 Creating package-hotel relationships...')
  await prisma.package_hotels.create({
    data: {
      packhotel_id: 1,
      package_id: '11',
      hotel_id: 1,
    }
  })

  // 20. Create Package-Interpreter relationships
  console.log('🗣️ Creating package-interpreter relationships...')
  await prisma.package_interpreters.createMany({
    data: [
      { inter_id: 1, package_id: '11', interpreter_id: 1 },
      { inter_id: 2, package_id: '11', interpreter_id: 6 },
    ]
  })

  // 21. Create Trips
  console.log('🎒 Creating trips...')
  const trip = await prisma.trips.create({
    data: {
      tour_id: 1,
      package_id: '11',
      description: 'Mae Fah Luang package',
      total_price: 400,
    }
  })

  // 22. Create Package Places (Trip itinerary)
  console.log('📍 Creating package places...')
  await prisma.package_places.createMany({
    data: [
      { packplace_id: 1, tour_id: 1, place_id: '1', date: 1, start: '10:00', end: '12:00' },
      { packplace_id: 2, tour_id: 1, place_id: '3', date: 2, start: '10:00', end: '17:00' },
      { packplace_id: 3, tour_id: 1, place_id: '2', date: 1, start: '13:00', end: '15:00' },
      { packplace_id: 4, tour_id: 1, place_id: '4', date: 1, start: '15:00', end: '17:00' },
    ]
  })

  // 23. Create Patient Details
  console.log('🏥 Creating patient details...')
  const patients = await prisma.patient_details.createMany({
    data: [
      {
        patient_id: 8,
        firstname: 'John',
        lastname: 'Smith',
        gender: 'Male',
        dateofbirth: new Date('1985-07-09'),
        nationality: 'American',
        passport_number: 'PA0378068',
      },
      {
        patient_id: 9,
        firstname: 'Maria',
        lastname: 'Garcia',
        gender: 'Female',
        dateofbirth: new Date('1990-07-25'),
        nationality: 'Spanish',
        passport_number: 'ES1234567',
      },
      {
        patient_id: 10,
        firstname: 'Sondeth',
        lastname: 'Bounphanith',
        gender: 'Male',
        dateofbirth: new Date('1995-07-02'),
        nationality: 'Laotian',
        passport_number: 'PA0378068',
      }
    ]
  })

  // 24. Create User Contact Details
  console.log('📞 Creating user contact details...')
  await prisma.user_contact_detail.createMany({
    data: [
      {
        id: '29',
        firstname: 'John',
        lastname: 'Smith',
        email: 'john.smith@example.com',
        country: 'USA',
        phone: 1234567890,
      },
      {
        id: '30',
        firstname: 'Maria',
        lastname: 'Garcia',
        email: 'maria.garcia@example.com',
        country: 'Spain',
        phone: 34123456789,
      },
      {
        id: '31',
        firstname: 'Sondeth',
        lastname: 'Bounphanith',
        email: '6531501229@lamduan.mfu.ac.th',
        country: 'Thailand',
        phone: 838947830,
      }
    ]
  })

  console.log('📋 Creating appointments...');
  const appointments = await prisma.appointments.createMany({
    data: [
      {
        appointment_id: '8',
        date: new Date('2025-07-31'),
        timeslot: '8:00 - 8:30',
        patient_id: 8,
        description: 'Sodeth',
        doctor_id: null,
        status: 'In_Progress'
      },
      {
        appointment_id: '9',
        date: new Date('2025-07-29'),
        timeslot: '8:00 - 8:30',
        patient_id: 9,
        description: 'dd',
        doctor_id: null,
        status: 'In_Progress'
      },
      {
        appointment_id: '10',
        date: new Date('2025-07-29'),
        timeslot: '10:00 - 10:30',
        patient_id: 10,
        description: '',
        doctor_id: null,
        status: 'In_Progress'
      }
    ]
  });

  console.log('📄 Creating files...');
  const files = await prisma.file.createMany({
    data: [
      {
        id: '1',
        userId: 10,
        originalName: 'certificate',
        fileName: 'certificate',
        fileType: 'pdf',
        fileSize: 1186778,
        cloudinaryId: 'Medical_report/documents/certificate_dnlgcu',
        url: 'https://res.cloudinary.com/dpunifgmo/image/upload/v1752701302/Medical_report/documents/certificate_dnlgcu.pdf',
        category: 'MEDICAL_REPORT',
        description: null
      },
      {
        id: '2',
        userId: 10,
        originalName: 'Student Profile',
        fileName: 'Student Profile',
        fileType: 'pdf',
        fileSize: 49199,
        cloudinaryId: 'Medical_report/documents/Student_Profile_ziwfdz',
        url: 'https://res.cloudinary.com/dpunifgmo/image/upload/v1752702187/Medical_report/documents/Student_Profile_ziwfdz.pdf',
        category: 'MEDICAL_REPORT',
        description: null
      },
      {
        id: '3',
        userId: 10,
        originalName: 'Student Grade Report-6531501229',
        fileName: 'Student Grade Report-6531501229',
        fileType: 'pdf',
        fileSize: 73698,
        cloudinaryId: 'Medical_report/documents/Student_Grade_Report-6531501229_uwrnjo',
        url: 'https://res.cloudinary.com/dpunifgmo/image/upload/v1752717021/Medical_report/documents/Student_Grade_Report-6531501229_uwrnjo.pdf',
        category: 'MEDICAL_REPORT',
        description: null
      }
    ]
  });

  console.log('📎 Creating appointment files...');
  const appointmentFiles = await prisma.appointmentFile.createMany({
    data: [
      {
        appointmentId: '8',
        fileId: '1'
      },
      {
        appointmentId: '9',
        fileId: '2'
      },
      {
        appointmentId: '10',
        fileId: '3'
      }
    ]
  });

  console.log('🏨 Creating hotel bookings...');
  const hotelBookings = await prisma.hotel_bookings.createMany({
    data: [
      {
        booking_id: 18,
        hotel_id: 1,
        check_in_date: new Date('2025-07-17'),
        check_out_date: new Date('2025-07-19'),
        guest_children: 1,
        guest_adult: 1,
        total_price: 11780,
        status: 'In_Progress'
      },
      {
        booking_id: 19,
        hotel_id: 1,
        check_in_date: new Date('2025-07-17'),
        check_out_date: new Date('2025-07-24'),
        guest_children: 0,
        guest_adult: 1,
        total_price: 41230,
        status: 'In_Progress'
      },
      {
        booking_id: 20,
        hotel_id: 1,
        check_in_date: new Date('2025-07-17'),
        check_out_date: new Date('2025-07-19'),
        guest_children: 0,
        guest_adult: 1,
        total_price: 11780,
        status: 'In_Progress'
      },
      {
        booking_id: 21,
        hotel_id: 1,
        check_in_date: new Date('2025-07-17'),
        check_out_date: new Date('2025-07-19'),
        guest_children: 0,
        guest_adult: 1,
        total_price: 11780,
        status: 'In_Progress'
      }
    ]
  });

  console.log('🗣️ Creating interpreter bookings...');
  const interBookings = await prisma.inter_bookings.createMany({
    data: [
      {
        booking_id: 1,
        interpreter_id: 1,
        start: null,
        end: null,
        status: 'In_Progress'
      },
      {
        booking_id: 2,
        interpreter_id: 1,
        start: null,
        end: null,
        status: 'In_Progress'
      }
    ]
  });

  console.log('🎫 Creating tourism bookings...');
  const tourismBookings = await prisma.tourism_bookings.createMany({
    data: [
      {
        tourism_id: '1',
        tour_id: 1,
        status: 'In_Progress'
      },
      {
        tourism_id: '2',
        tour_id: 1,
        status: 'In_Progress'
      },
      {
        tourism_id: '3',
        tour_id: 1,
        status: 'In_Progress'
      },
      {
        tourism_id: '4',
        tour_id: 1,
        status: 'In_Progress'
      },
      {
        tourism_id: '5',
        tour_id: 1,
        status: 'In_Progress'
      },
      {
        tourism_id: '6',
        tour_id: 1,
        status: 'In_Progress'
      }
    ]
  });

  console.log('📞 Creating user contact details...');
  const userContactDetails = await prisma.user_contact_detail.createMany({
    data: [
      {
        id: '29',
        firstname: 'Sondeth',
        lastname: 'Bounphanith',
        email: 'Sondeth.bpn@gmail.com',
        country: 'Thailand',
        phone: 838947830
      },
      {
        id: '30',
        firstname: 'Sondeth',
        lastname: 'Bounphanith',
        email: '6531501229@lamduan.mfu.ac.th',
        country: 'Thailand',
        phone: 838947830
      },
      {
        id: '31',
        firstname: 'Sondeth',
        lastname: 'Bounphanith',
        email: '6531501229@lamduan.mfu.ac.th',
        country: 'Thailand',
        phone: 838947830
      }
    ]
  });

  console.log('📦 Creating package bookings...');
  const packageBookings = await prisma.package_bookings.createMany({
    data: [
      {
        booking_id: '2',
        user_id: 10,
        package_id: '11',
        tourism_booking_id: '2',
        appointment_id: '8',
        hotel_booking_id: 18,
        contact_id: '29',
        inter_booking_id: null,
        status: 'Pending'
      },
      {
        booking_id: '3',
        user_id: 12,
        package_id: '11',
        tourism_booking_id: '3',
        appointment_id: '9',
        hotel_booking_id: 19,
        contact_id: '30',
        inter_booking_id: null,
        status: 'Pending'
      },
      {
        booking_id: 'cd3fa2d2-c597-4d5f-a5a0-7e4bad9834cf',
        user_id: 10,
        package_id: '11',
        tourism_booking_id: '6',
        appointment_id: '10',
        hotel_booking_id: 21,
        contact_id: '31',
        inter_booking_id: 2,
        status: 'Pending'
      }
    ]
  });

  console.log('🛏️ Creating room aggregates...');
  const roomAggregates = await prisma.room_aggregate.createMany({
    data: [
      {
        aggregate_id: 1,
        booking_id: 18,
        room_id: 2,
        amount: 1
      },
      {
        aggregate_id: 2,
        booking_id: 19,
        room_id: 2,
        amount: 1
      },
      {
        aggregate_id: 3,
        booking_id: 20,
        room_id: 2,
        amount: 1
      },
      {
        aggregate_id: 4,
        booking_id: 21,
        room_id: 2,
        amount: 1
      }
    ]
  });

  console.log('⭐ Creating hospital reviews...');
  const hospitalReviews = await prisma.review_hospital.createMany({
    data: [
      {
        review_id: 2,
        user_id: 1,
        hospital_id: '1',
        rating: 4.5,
        title_review: 'Great',
        comment: 'The staff was very professional and the service was excellent.The staff was very professional and the service was excellent.The staff was very professional and the service was excellent.The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-15T16:48:27.000Z')
      },
      {
        review_id: 4,
        user_id: 2,
        hospital_id: '1',
        rating: 4.5,
        title_review: 'Great',
        comment: 'The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-15T16:53:44.000Z')
      },
      {
        review_id: 5,
        user_id: 1,
        hospital_id: '1',
        rating: 3.5,
        title_review: 'Great Service!',
        comment: 'The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-16T18:59:17.000Z')
      }
    ]
  });

  console.log('🏨 Creating hotel reviews...');
  const hotelReviews = await prisma.review_hotel.createMany({
    data: [
      {
        review_id: 1,
        user_id: 3,
        hotel_id: 1,
        rating: 5,
        title_review: 'Friendly staff',
        comment: "Stayed during a storm in Chiang Rai, power outage occurred unexpectedly. Staff didn't know what to do. However, they tried their best to provide service with their limited resources. Room had a decent water pressure. Breakfast had a variety of options but tasted average. Comfortable bed made it hard to get up. Spacious room with good air conditioning.",
        created_at: new Date('2025-06-06T09:41:16.000Z')
      },
      {
        review_id: 2,
        user_id: 1,
        hotel_id: 1,
        rating: 4.5,
        title_review: 'First trip to Chiang Rai.',
        comment: 'I took my family to Chiang Rai for the first time and we stayed in a great family room with two bedrooms. It was very clean and my partner and children loved it. The room was spacious and comfortable, but the downside was that the plugs were difficult to use. The breakfast was varied and included many international options. Additionally, they provided sour noodle soup and it was very delicious. We were impressed and would choose to stay here again if we have the opportunity. ❤️❤️',
        created_at: new Date('2025-06-06T09:41:16.000Z')
      }
    ]
  });

  console.log('🗣️ Creating interpreter reviews...');
  const interpreterReviews = await prisma.review_inter.createMany({
    data: [
      {
        review_id: 2,
        user_id: 1,
        interpreter_id: 1,
        rating: 4.2,
        title_review: 'Great Service!',
        comment: 'The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-15T16:59:07.000Z')
      },
      {
        review_id: 4,
        user_id: 10,
        interpreter_id: 1,
        rating: 4,
        title_review: 'Excellent',
        comment: 'Nice service',
        created_at: new Date('2025-03-19T16:13:15.000Z')
      },
      {
        review_id: 5,
        user_id: 3,
        interpreter_id: 1,
        rating: 4.5,
        title_review: 'Great service',
        comment: 'The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-19T16:22:16.000Z')
      },
      {
        review_id: 6,
        user_id: 3,
        interpreter_id: 1,
        rating: 4.5,
        title_review: 'Great service',
        comment: 'The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-19T16:22:23.000Z')
      },
      {
        review_id: 7,
        user_id: 3,
        interpreter_id: 1,
        rating: 4.5,
        title_review: 'Great service',
        comment: 'The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-19T16:22:27.000Z')
      },
      {
        review_id: 8,
        user_id: 10,
        interpreter_id: 1,
        rating: 4.5,
        title_review: 'Great service',
        comment: 'The staff was very professional and the service was excellent.',
        created_at: new Date('2025-03-19T16:22:30.000Z')
      }
    ]
  });

  console.log('✅ Additional seeding completed!');

}





        