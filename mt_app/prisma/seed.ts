const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// docker-compose exec web npx prisma db seed

  async function seedAdditionalData() {
console.log('🎓 Creating doctor education...')
  await prisma.doc_education.createMany({
    data: [
      {
        education_id: 9,
        doctor_id: '3',
        field_of_study: 'Endocrinology and Metabolism',
        institution: 'University of California at San Diego (UCSD)',
        year: 2002,
      },
      {
        education_id: 10,
        doctor_id: '3',
        field_of_study: 'Internal Medicine',
        institution: 'JTemple University Medical School’s at Abington Memorial, United States',
        year: 1997,
      },
      {
        education_id: 11,
        doctor_id: '3',
        field_of_study: 'Doctor of Medicine',
        institution: 'Cebu Doctors College of Medicine, Philippines',
        year: 1989,
      },
    ]
  })


//   (8, '3', 'Endocrinology and Metabolism', 'University of California at San Diego (UCSD)', 2002),
// (9, '3', 'Internal Medicine', 'Temple University Medical School’s at Abington Memorial, United States', 1997),
// (10, '3', 'Doctor of Medicine', 'Cebu Doctors College of Medicine, Philippines', 1989);
  console.log('✅ Additional seeding completed!');
}
seedAdditionalData();
