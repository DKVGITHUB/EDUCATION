import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import cosineSimilarity from "compute-cosine-similarity";

import { uniq, flatten, List } from "lodash";

import careers from "@/components/career-skill.json";
import majors from "@/components/major-skill.json";

const allSkills = uniq(flatten(careers.map((career) => career.skills)));

export const skillsToVector = (skills: any) => {
  return allSkills.map((skill) => (skills.includes(skill) ? 1 : 0));
};

const allMajors = uniq(flatten(majors.map((major) => major.skills)));

export const majorsToVector = (skills: any) => {
  return allMajors.map((skill) => (skills.includes(skill) ? 1 : 0));
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
