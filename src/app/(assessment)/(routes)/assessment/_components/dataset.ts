export const month = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

// Generate an array representing the days of the month (1 to 31)
export const daysOfMonth = Array.from({ length: 31 }, (_, index) => index + 1);

// Generate an array representing years from 1950 to 2010 (inclusive)
export const years = Array.from(
  { length: 2010 - 1950 + 1 },
  (_, index) => 1950 + index
);

// Generate an array representing graduation years from 1950 to 2030 (inclusive)
export const graduationYears = Array.from(
  { length: 2030 - 2005 + 1 },
  (_, index) => 2005 + index
);

// ... (options for ethnic background)
export const ethnic = [
  { label: "African", value: "African" },
  { label: "African American", value: "African American" },
  { label: "Afro-Caribbean", value: "Afro-Caribbean" },
  { label: "Arab", value: "Arab" },
  { label: "Ashkenazi Jewish", value: "Ashkenazi Jewish" },
  { label: "Asian", value: "Asian" },
  { label: "European", value: "European" },
  { label: "Hispanic or Latino", value: "Hispanic or Latino" },
  {
    label: "Indigenous or Native American",
    value: "Indigenous or Native American",
  },
  { label: "Middle Eastern", value: "Middle Eastern" },
];

// ... (options for Ghana regions)
export const ghanaRegions = [
  { label: "Ashanti", value: "Ashanti" },

  { label: "Central", value: "Central" },
  { label: "Eastern", value: "Eastern" },
  { label: "Greater Accra", value: "Greater Accra" },

  { label: "Volta", value: "Volta" },
];

// ... (options for college skills)
export const collegeSkills = [
  { label: "Time Management", value: "Time Management" },
  { label: "Organization", value: "Organization" },
  { label: "Effective Communication", value: "Effective Communication" },
  { label: "Critical Thinking", value: "Critical Thinking" },
  { label: "Problem Solving", value: "Problem Solving" },
  { label: "Adaptability", value: "Adaptability" },
  { label: "Research Skills", value: "Research Skills" },
  { label: "Writing and Editing", value: "Writing and Editing" },
];

// ... (options for currently attending)
export const currentlyAttending = [
  { label: "High School", value: "high school" },
  { label: "4 Year College", value: "4 year college" },
  { label: "Not Attending School", value: "not attending school" },
];

// ... (options for type of universities)
export const typeUnis = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

// ... (options for interesting careers)
export const interestingCareers = [
  "Management",
  "Entrepreneurship",
  "Leadership",
  "Coding",
  "Software Development",
  "Machine Learning",
  "Research",
  "Public Relations",
  "Social Media",
  "Journalism",
  "Writing",
  "Advertising",
  "Brand Management",
  "Financial Planning",
  "Creative Writing",
];

export const HSPrograms = [
  "General Science",
  "General Arts",
  "Business",
  "Home Economics",
  "Visual Arts",
  "Agriculture",
  "Technical Studies",
];

export const grades = ["A1", "B2", "B3", "C4", "C5", "C6"];

export const programs = [
  {
    name: "Business Administration",
    subjects: [
      "English",
      "Mathematics",
      "Integrated Science",
      "Social Studies",
    ],
    electives: ["Business Management", "Economics", "Elective Mathematics"],
  },
  {
    name: "Bachelor of Law (LLB)",
    subjects: [
      "English",
      "Mathematics",
      "Integrated Science",
      "Social Studies",
    ],
    electives: ["Literature in English", "Government", "History"],
  },
  {
    name: "Bachelor of Arts (BA)",
    subjects: [
      "English",
      "Mathematics",
      "Integrated Science",
      "Social Studies",
    ],
    electives: ["Literature in English", "Fine Arts", "Economics"],
  },
  {
    name: "Bachelor in Architecture",
    subjects: [
      "English",
      "Mathematics",
      "Integrated Science",
      "Social Studies",
    ],
    electives: ["Physics", "Elective Mathematics", "Economics"],
  },
  {
    name: "Information Technology (IT)",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
  {
    name: "Bachelor of Education (B.Ed.)",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
  {
    name: "Bachelor of Science in Social Sciences (B.Sc.)",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
  {
    name: "Bachelor of Arts in Communication Studies",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
  {
    name: "Bachelor of Public Administration",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
  {
    name: "Bachelor of Arts in International Relations",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
  {
    name: "Bachelor of Arts in Tourism and Hospitality Management",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
  {
    name: "Bachelor of Social Work",
    subjects: [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
    ],
    electives: [
      "Elective Mathematics",
      "Physics",
      "Chemistry",
      "Computer Studies/ICT",
    ],
  },
];

export const electives = [
  "Business Management",
  "Economics",
  "Elective Mathematics",
  "Physics",
  "Chemistry",
  "Elective ICT",
  "Biology",
  "Geography",
  "History",
  "Government",
  "Religious Studies",
  "French",
  "Financial Accounting",
  "Cost Accounting",
  "Management",
  "Food & Nutrition",
  "Arts",
  "Textiles",
  "Management in Living",
  "Graphic Design",
  "Basketry",
  "Leatherwork",
  "Sculpture",
  "Ceramics",
  "General Agriculture",
  "Animal Husbandry",
  "Building Construction",
  "Engineering",
  "Woodwork",
];
