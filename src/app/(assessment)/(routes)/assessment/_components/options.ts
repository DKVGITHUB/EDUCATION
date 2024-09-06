// Import types if not already defined
type Option = { label: string; value: string };

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

const toProgramOptions = (
  arr: { name: string; subjects: string[]; electives: string[] }[]
) =>
  arr.map((item) => ({
    label: item.name,
    value: item.name,
  }));

// Create options objects
export const options = {
  daysOfMonth: toNumberOptions(daysOfMonth),
  years: toNumberOptions(years),
  graduationYears: toNumberOptions(graduationYears),
  currentlyAttending: toOptions(currentlyAttending),
  programs: toProgramOptions(programs),
  optionalPrograms: toProgramOptions(programs),
  HSPrograms: toNumberOptions(HSPrograms),
  grades: toNumberOptions(grades),
  ghanaRegions: toOptions(ghanaRegions),
  typeUnis: toOptions(typeUnis),
  collegeSkills: toOptions(collegeSkills),
  interestingCareers: toNumberOptions(interestingCareers),
  electives: toNumberOptions(electives),
};
