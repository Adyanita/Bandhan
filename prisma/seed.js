const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a user first (required by Profile)
  const user = await prisma.user.create({
    data: {
      id: 'user-1',
      email: 'sample@example.com',
      name: 'Sample User',
      passwordHash: 'hashedpassword',
    },
  });

  await prisma.profile.create({
    data: {
      userId: user.id,
      name: 'Sample User',
      gender: 'Other',
      dob: new Date('1990-01-01'),
      height: '170cm',
      maritalStatus: 'Single',
      complexion: 'Fair',
      bodyType: 'Average',
      diet: 'Vegetarian',
      photo: null,
      religion: 'None',
      caste: 'None',
      city: 'Sample City',
      languages: 'English',
      about: 'This is a sample profile.',
      hobbies: 'Reading, Music',
      education: 'Graduate',
      profession: 'Engineer',
      income: '50000',
      fatherProfession: 'Business',
      motherProfession: 'Teacher',
      siblings: '1',
      partnerReligion: 'Any',
      partnerCity: 'Any',
      partnerMinAge: 25,
      partnerMaxAge: 35,
      verified: true,
    },
  });
  console.log('Sample profile created!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
