// Import types if not already defined
type Option = { label: string; value: string };

import { db } from "@/lib/db";
// Import datasets
import {
  daysOfMonth,
  years,
  graduationYears,
  currentlyAttending,
  programs,
  HSPrograms,
  grades,
  ghanaRegions,
  typeUnis,
  collegeSkills,
  interestingCareers,
  electives,
  subjects,
} from "./dataset";

// Helper function to convert array to options
const toNumberOptions = (arr: (string | number)[]) =>
  arr.map((item) => ({
    label: item.toString(),
    value: item.toString(),
  }));

const toOptions = (arr: { label: string; value: string }[]): Option[] =>
  arr.map((item) => ({
    label: item.label,
    value: item.value,
  }));

const toDataOptions = (arr: { id: string; name: string }[]): Option[] =>
  arr.map((item) => ({
    label: item.name,
    value: item.name,
  }));

// Fetch data from the database and convert to options
async function fetchProgramsAndOthers() {
  try {
    // Fetch programs from the database
    const hSProgram = await db.hSProgram.findMany();
    const uEProgram = await db.uEProgram.findMany();
    const uRElective = await db.uRElective.findMany();
    const uRSkill = await db.uRSkill.findMany();
    const uRInterest = await db.uRInterest.findMany();

    // Convert programs and electives to options

    const HSPrograms = toDataOptions(hSProgram);
    const OPPrograms = toDataOptions(uEProgram);
    const Programs = toDataOptions(uEProgram);
    const electives = toDataOptions(uRElective);
    const collegeSkills = toDataOptions(uRSkill);
    const interestingCareers = toDataOptions(uRInterest);

    console.log(
      HSPrograms,
      OPPrograms,
      Programs,
      electives,
      collegeSkills,
      interestingCareers
    );

    return {
      HSPrograms,
      OPPrograms,
      Programs,
      electives,
      collegeSkills,
      interestingCareers,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      HSPrograms: [],
      OPPrograms: [],
      Programs: [],
      electives: [],
      collegeSkills: [],
      interestingCareers: [],
    };
  }
}

// Create options objects
export const options = {
  daysOfMonth: toNumberOptions(daysOfMonth),
  years: toNumberOptions(years),
  graduationYears: toNumberOptions(graduationYears),
  currentlyAttending: toOptions(currentlyAttending),
  grades: toNumberOptions(grades),
  ghanaRegions: toOptions(ghanaRegions),
  typeUnis: toOptions(typeUnis),
  subjects,
};

async function getDynamicOptions() {
  const {
    HSPrograms,
    OPPrograms,
    Programs,
    electives,
    collegeSkills,
    interestingCareers,
  } = await fetchProgramsAndOthers();

  return {
    HSPrograms,
    OPPrograms,
    Programs,
    electives,
    collegeSkills,
    interestingCareers,
  };
}

export default getDynamicOptions;
