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

export const localStorageUtil = {
  save: (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  },
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return null;
    }
  },
};

export const isCyclic = (obj: any): boolean => {
  const seen = new Set();
  const detect = (obj: any): boolean => {
    if (obj && typeof obj === "object") {
      if (seen.has(obj)) return true;
      seen.add(obj);
      return Object.values(obj).some(detect);
    }
    return false;
  };
  return detect(obj);
};

export const isAggregatePassing = (arr: number[]) => {
  // Check if all numbers are between 1 and 6
  if (!arr.every((num) => num >= 1 && num <= 6)) {
    throw new Error("All numbers must be between 1 and 6");
  }

  // Calculate the sum of the numbers
  const sum = arr.reduce((acc, cur) => acc + cur, 0);

  // Return true if the sum is above 24, false otherwise
  return sum < 24;
};

export const preprocessGrades = (
  gradesObject: { [s: string]: number | string } | ArrayLike<number | string>
) => {
  const gradesMap: { [key: string]: number } = {
    A1: 1,
    B2: 2,
    B3: 3,
    C4: 4,
    C5: 5,
    C6: 6,
  };

  // Extract the grade values from the object
  const gradesArray = Object.values(gradesObject);

  // Map the grades to their corresponding points
  return gradesArray.map((grade) => {
    const gradeKey = grade.toString();
    return gradesMap[gradeKey] || 0; // Return 0 if grade is not found in gradesMap
  });
};
