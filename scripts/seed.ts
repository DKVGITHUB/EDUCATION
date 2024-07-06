const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const Skills = [
  {
    name: "Project Manager",
    skills: ["Time Management", "Leadership", "Communication"],
  },
  {
    name: "Executive Assistant",
    skills: ["Time Management", "Organization", "Attention to Detail"],
  },
  {
    name: "Event Planner",
    skills: ["Time Management", "Creativity", "Problem Solving"],
  },
  {
    name: "Logistics Coordinator",
    skills: ["Organization", "Problem Solving", "Communication"],
  },
  {
    name: "Public Relations Specialist",
    skills: ["Effective Communication", "Media Relations", "Writing"],
  },
  {
    name: "Marketing Manager",
    skills: [
      "Effective Communication",
      "Strategic Planning",
      "Market Research",
    ],
  },
  {
    name: "Human Resources Manager",
    skills: ["Effective Communication", "Employee Relations", "Recruitment"],
  },
  {
    name: "Management Consultant",
    skills: ["Critical Thinking", "Problem Solving", "Analytical Skills"],
  },
  {
    name: "Data Scientist",
    skills: ["Critical Thinking", "Data Analysis", "Statistical Modeling"],
  },
  {
    name: "Research Analyst",
    skills: ["Critical Thinking", "Research Skills", "Attention to Detail"],
  },
  {
    name: "Software Developer",
    skills: ["Problem Solving", "Programming", "Logical Thinking"],
  },
  {
    name: "Mechanical Engineer",
    skills: ["Problem Solving", "Engineering Design", "Analytical Skills"],
  },
  {
    name: "Financial Analyst",
    skills: ["Problem Solving", "Financial Modeling", "Data Analysis"],
  },
  {
    name: "Content Writer",
    skills: ["Writing and Editing", "Creativity", "Adaptability"],
  },
  {
    name: "Editor",
    skills: ["Writing and Editing", "Attention to Detail", "Communication"],
  },
  {
    name: "Technical Writer",
    skills: ["Writing and Editing", "Research Skills", "Clarity"],
  },
  {
    name: "Change Management Consultant",
    skills: ["Adaptability", "Communication", "Problem Solving"],
  },
  {
    name: "Entrepreneur",
    skills: ["Adaptability", "Risk-taking", "Innovativeness"],
  },
  {
    name: "Project Manager",
    skills: ["Adaptability", "Leadership", "Critical Thinking"],
  },
  {
    name: "Market Research Analyst",
    skills: ["Research Skills", "Analytical Skills", "Problem Solving"],
  },
  {
    name: "Scientific Researcher",
    skills: ["Research Skills", "Critical Thinking", "Attention to Detail"],
  },
  {
    name: "Academic Researcher",
    skills: ["Research Skills", "Writing and Editing", "Data Analysis"],
  },
];

async function main() {
  try {
    for (const career of Skills) {
      const skillConnections = [];
      for (const skill of career.skills) {
        const existingSkill = await database.skill_Career_Skills.upsert({
          where: { name: skill },
          update: {},
          create: { name: skill },
        });

        skillConnections.push({ skillId: existingSkill.id });
      }
      await database.Skill_Career.create({
        data: {
          name: career.name,
          skills: {
            create: skillConnections,
          },
        },
      });
    }
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
