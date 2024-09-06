import { z } from "zod";

const optional = <T extends z.ZodTypeAny>(schema: T) => {
  return z
    .union([schema, z.literal("")])
    .transform((value) => (value === "" ? undefined : value))
    .optional();
};
// Define reusable schemas
const nonEmptyString = z.string().min(1, "This field is required");
const optionalNonEmptyString = optional(nonEmptyString);
const gradeSchema = optional(z.enum(["A1", "B2", "B3", "C4", "C5", "C6"]));

// Define subject schemas
const coreSubjects = z.object({
  english: gradeSchema,
  socialStudies: gradeSchema,
  mathematics: gradeSchema,
  integratedScience: gradeSchema,
});

const electiveSubjects = z.object({
  businessManagement: gradeSchema,
  economics: gradeSchema,
  electiveMathematics: gradeSchema,
  physics: gradeSchema,
  chemistry: gradeSchema,
  electiveICT: gradeSchema,
  biology: gradeSchema,
  geography: gradeSchema,
  history: gradeSchema,
  government: gradeSchema,
  religiousStudies: gradeSchema,
  french: gradeSchema,
  financialAccounting: gradeSchema,
  costAccounting: gradeSchema,
  management: gradeSchema,
  foodAndNutrition: gradeSchema,
  arts: gradeSchema,
  textiles: gradeSchema,
  managementInLiving: gradeSchema,
  graphicDesign: gradeSchema,
  basketry: gradeSchema,
  leatherwork: gradeSchema,
  sculpture: gradeSchema,
  ceramics: gradeSchema,
  generalAgriculture: gradeSchema,
  animalHusbandry: gradeSchema,
  buildingConstruction: gradeSchema,
  engineering: gradeSchema,
  woodwork: gradeSchema,
});

// Main form schema
const formSchema = z.object({
  // Personal Information
  dateOfBirth: z.object({
    day: z.string().min(1, "Day is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
  }),
  ethnic: nonEmptyString,
  gender: nonEmptyString,

  // Educational Information
  hsgradYear: z.string().regex(/^\d{4}$/, "Must be a valid year"),
  currAttending: nonEmptyString,
  programs: nonEmptyString,
  alprograms: optionalNonEmptyString,
  hsprograms: optionalNonEmptyString,

  // Grades
  grades: coreSubjects.merge(electiveSubjects),

  // School Information
  regionOfSchool: nonEmptyString,
  typeOfUni: nonEmptyString,

  // Skills and Interests
  skill: z.array(nonEmptyString).min(1, "At least one skill is required"),
  interest: z.array(nonEmptyString).min(1, "At least one interest is required"),
  elective: z.array(nonEmptyString).min(1, "At least one elective is required"),
});

export type FormValues = z.infer<typeof formSchema>;
export { formSchema };
