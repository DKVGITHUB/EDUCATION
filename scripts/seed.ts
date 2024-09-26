const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const programs = [
  "Business Administration",

  "Law (LLB)",

  "Arts (BA)",

  "Bachelor in Architecture",

  "Information Technology (IT)",

  "Education (B.Ed.)",

  "Science in Social Sciences (B.Sc.)",

  "Arts in Communication Studies",

  "Public Administration",

  "Arts in International Relations",

  "Arts in Tourism and Hospitality Management",

  "Social Work",
];

const interestingCareers = [
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

const HSPrograms = [
  "General Science",
  "General Arts",
  "Business",
  "Home Economics",
  "Visual Arts",
  "Agriculture",
  "Technical Studies",
];

const collegeSkills = [
  "Time Management",
  "Organization",
  "Effective Communication",
  "Critical Thinking",
  "Problem Solving",
  "Adaptability",
  "Research Skills",
  "Writing and Editing",
];

async function main() {
  try {
    // Seed the electives data
    await database.UEProgram.createMany({
      data: programs.map((name) => ({ name })),
    });

    await database.HSProgram.createMany({
      data: HSPrograms.map((name) => ({ name })),
    });

    await database.URSkill.createMany({
      data: collegeSkills.map((name) => ({ name })),
    });

    await database.URInterest.createMany({
      data: interestingCareers.map((name) => ({ name })),
    });

    console.log("Success: Electives seeded successfully");
  } catch (error) {
    console.error("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
