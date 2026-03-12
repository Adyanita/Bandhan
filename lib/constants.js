// ─── Religions & Castes ────────────────────────────────────────────────────────
export const RELIGIONS = [
  'Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain',
  'Buddhist', 'Parsi', 'Jewish', 'Other',
];

export const CASTES_BY_RELIGION = {
  Hindu: ['Brahmin','Kshatriya','Vaishya','Shudra','Kayastha','Rajput','Maratha',
          'Nair','Reddy','Naidu','Iyer','Iyengar','Lingayat','Agarwal','Goud','Other'],
  Muslim: ['Sunni','Shia','Ismaili','Bohra','Pathan','Syed','Sheikh','Mughal','Ansari','Other'],
  Christian: ['Catholic','Protestant','Orthodox','Baptist','Methodist','Evangelical','Other'],
  Sikh: ['Jat','Arora','Khatri','Ramgarhia','Saini','Other'],
  Jain: ['Digambara','Shvetambara','Other'],
  Buddhist: ['Theravada','Mahayana','Vajrayana','Other'],
  Parsi: ['Irani','Other'],
  Jewish: ['Ashkenazi','Sephardic','Mizrahi','Other'],
  Other: ['Other'],
};

// ─── Personal ─────────────────────────────────────────────────────────────────
export const GENDERS = ['Male', 'Female'];

export const MARITAL_STATUS = [
  'Never Married', 'Divorced', 'Widowed', 'Separated',
];

export const HEIGHTS = Array.from({ length: 24 }, (_, i) => {
  const totalInches = i + 60;
  const ft = Math.floor(totalInches / 12);
  const inch = totalInches % 12;
  return `${ft}'${inch}" (${Math.round(totalInches * 2.54)} cm)`;
});

export const COMPLEXIONS = ['Fair', 'Very Fair', 'Wheatish', 'Wheatish Brown', 'Dark', 'Other'];
export const BODY_TYPES   = ['Slim', 'Athletic', 'Average', 'Heavy'];
export const DIET         = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian', 'Jain Vegetarian'];

// ─── Education & Career ───────────────────────────────────────────────────────
export const EDUCATION = [
  'High School', 'Diploma', "Bachelor's", "Master's", 'MBA',
  'PhD', 'MD/MBBS', 'LLB/LLM', 'CA/CPA', 'Other',
];

export const PROFESSIONS = [
  'Software Engineer', 'Doctor', 'Lawyer', 'Teacher', 'Business Owner',
  'Government Employee', 'Finance/Banking', 'Artist', 'Architect', 'Engineer',
  'Consultant', 'Researcher', 'Homemaker', 'Student', 'Other',
];

export const INCOME_RANGES = [
  'Below ₹3L', '₹3L–₹5L', '₹5L–₹10L', '₹10L–₹20L',
  '₹20L–₹50L', '₹50L+', 'Not Disclosed',
];

// ─── Location ─────────────────────────────────────────────────────────────────
export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Bhopal', 'Indore',
  'Surat', 'Nagpur', 'Vadodara', 'Nashik', 'Agra', 'Patna',
  'London', 'New York', 'Toronto', 'Dubai', 'Singapore', 'Sydney', 'Melbourne',
  'Other',
];

// ─── Sample Profiles ──────────────────────────────────────────────────────────
export const SAMPLE_PROFILES = [
  {
    id: 'sample_1',
    name: 'Priya Sharma', gender: 'Female', dob: '1996-03-15',
    religion: 'Hindu', caste: 'Brahmin',
    education: "Master's", profession: 'Software Engineer',
    city: 'Bangalore', height: HEIGHTS[8],
    maritalStatus: 'Never Married', diet: 'Vegetarian',
    complexion: 'Fair', bodyType: 'Slim', income: '₹10L–₹20L',
    about: 'Passionate about technology and travel. Looking for a life partner who values family and personal growth.',
    hobbies: 'Reading, Hiking, Cooking, Photography',
    languages: 'Hindi, English, Kannada',
    fatherProfession: 'Government Employee', motherProfession: 'Teacher', siblings: '1 Brother',
    partnerReligion: 'Hindu', partnerMinAge: '25', partnerMaxAge: '34', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=47',
    verified: true, createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'sample_2',
    name: 'Rahul Mehta', gender: 'Male', dob: '1993-07-22',
    religion: 'Hindu', caste: 'Agarwal',
    education: 'MBA', profession: 'Business Owner',
    city: 'Mumbai', height: HEIGHTS[14],
    maritalStatus: 'Never Married', diet: 'Vegetarian',
    complexion: 'Wheatish', bodyType: 'Athletic', income: '₹50L+',
    about: 'Running a successful textile export business. Love cricket and travelling.',
    hobbies: 'Cricket, Travel, Music, Cooking',
    languages: 'Hindi, English, Gujarati',
    fatherProfession: 'Business Owner', motherProfession: 'Homemaker', siblings: '2 Sisters',
    partnerReligion: 'Any', partnerMinAge: '22', partnerMaxAge: '30', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=12',
    verified: true, createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'sample_3',
    name: 'Ananya Iyer', gender: 'Female', dob: '1997-11-08',
    religion: 'Hindu', caste: 'Iyer',
    education: 'MD/MBBS', profession: 'Doctor',
    city: 'Chennai', height: HEIGHTS[6],
    maritalStatus: 'Never Married', diet: 'Vegetarian',
    complexion: 'Fair', bodyType: 'Slim', income: '₹10L–₹20L',
    about: 'Pediatrician by profession, dancer at heart. Seeking a kind, ambitious partner from a good family.',
    hobbies: 'Classical Dance, Yoga, Painting',
    languages: 'Tamil, English, Hindi',
    fatherProfession: 'Retired Professor', motherProfession: 'Doctor', siblings: '1 Sister',
    partnerReligion: 'Hindu', partnerMinAge: '27', partnerMaxAge: '36', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=44',
    verified: true, createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'sample_4',
    name: 'Arjun Singh', gender: 'Male', dob: '1991-05-30',
    religion: 'Sikh', caste: 'Jat',
    education: "Bachelor's", profession: 'Government Employee',
    city: 'Chandigarh', height: HEIGHTS[18],
    maritalStatus: 'Never Married', diet: 'Non-Vegetarian',
    complexion: 'Fair', bodyType: 'Athletic', income: '₹5L–₹10L',
    about: 'Army officer, disciplined and family-oriented. Looking for a life partner who shares values of service and respect.',
    hobbies: 'Fitness, Reading, Trekking',
    languages: 'Punjabi, Hindi, English',
    fatherProfession: 'Retired Army Officer', motherProfession: 'Homemaker', siblings: '1 Brother',
    partnerReligion: 'Sikh', partnerMinAge: '23', partnerMaxAge: '30', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=15',
    verified: false, createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'sample_5',
    name: 'Fatima Khan', gender: 'Female', dob: '1995-09-14',
    religion: 'Muslim', caste: 'Syed',
    education: "Master's", profession: 'Lawyer',
    city: 'Delhi', height: HEIGHTS[9],
    maritalStatus: 'Never Married', diet: 'Non-Vegetarian',
    complexion: 'Fair', bodyType: 'Average', income: '₹10L–₹20L',
    about: 'A passionate advocate with a love for literature and justice.',
    hobbies: 'Reading, Writing, Travel',
    languages: 'Urdu, Hindi, English',
    fatherProfession: 'Judge', motherProfession: 'Professor', siblings: '2 Brothers',
    partnerReligion: 'Muslim', partnerMinAge: '26', partnerMaxAge: '36', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=45',
    verified: true, createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'sample_6',
    name: 'Rohan Nair', gender: 'Male', dob: '1994-02-18',
    religion: 'Hindu', caste: 'Nair',
    education: "Master's", profession: 'Software Engineer',
    city: 'Kochi', height: HEIGHTS[12],
    maritalStatus: 'Never Married', diet: 'Non-Vegetarian',
    complexion: 'Wheatish', bodyType: 'Slim', income: '₹20L–₹50L',
    about: 'Senior developer at a MNC. Love movies, food and long drives. Family-oriented and fun loving.',
    hobbies: 'Movies, Cooking, Cricket',
    languages: 'Malayalam, English, Hindi',
    fatherProfession: 'Business Owner', motherProfession: 'Teacher', siblings: '1 Sister',
    partnerReligion: 'Hindu', partnerMinAge: '22', partnerMaxAge: '30', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=18',
    verified: true, createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'sample_7',
    name: 'Meera Reddy', gender: 'Female', dob: '1998-06-25',
    religion: 'Hindu', caste: 'Reddy',
    education: "Bachelor's", profession: 'Teacher',
    city: 'Hyderabad', height: HEIGHTS[5],
    maritalStatus: 'Never Married', diet: 'Vegetarian',
    complexion: 'Wheatish', bodyType: 'Average', income: '₹3L–₹5L',
    about: 'Elementary school teacher who loves children and art. Looking for a simple, honest, and caring partner.',
    hobbies: 'Painting, Music, Gardening',
    languages: 'Telugu, Hindi, English',
    fatherProfession: 'Farmer', motherProfession: 'Homemaker', siblings: '2 Brothers',
    partnerReligion: 'Hindu', partnerMinAge: '24', partnerMaxAge: '34', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=43',
    verified: false, createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'sample_8',
    name: 'Vikram Patel', gender: 'Male', dob: '1990-12-03',
    religion: 'Hindu', caste: 'Agarwal',
    education: 'CA/CPA', profession: 'Finance/Banking',
    city: 'Ahmedabad', height: HEIGHTS[15],
    maritalStatus: 'Divorced', diet: 'Vegetarian',
    complexion: 'Fair', bodyType: 'Average', income: '₹20L–₹50L',
    about: 'Chartered accountant with own practice. Divorced amicably. Looking for understanding partner.',
    hobbies: 'Finance, Reading, Badminton',
    languages: 'Gujarati, Hindi, English',
    fatherProfession: 'Business Owner', motherProfession: 'Homemaker', siblings: '1 Sister',
    partnerReligion: 'Any', partnerMinAge: '25', partnerMaxAge: '38', partnerCity: 'Any',
    photo: 'https://i.pravatar.cc/300?img=20',
    verified: true, createdAt: Date.now() - 86400000 * 8,
  },
];
