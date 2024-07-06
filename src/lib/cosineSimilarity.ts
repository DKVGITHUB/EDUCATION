// utils/cosineSimilarity.js
import cosineSimilarity from "compute-cosine-similarity";
import { majorsToVector, skillsToVector } from "./utils";

type GetCareerRecommendations = {
  name: string;
  similarity: number;
  skills: string[];
};

export const getCareerRecommendations = (
  userSkills: string[],
  careers: object[]
) => {
  const userVector = skillsToVector(userSkills);

  return careers
    .map((career: any) => {
      const careerVector = skillsToVector(career.skills);
      const similarity = cosineSimilarity(userVector, careerVector);
      return { ...career, similarity };
    })
    .sort(
      (a: { similarity: number }, b: { similarity: number }) =>
        b.similarity - a.similarity
    );
};

export const getMajorRecommendations = (
  userSkills: string[],
  majors: object[]
) => {
  const userVector = majorsToVector(userSkills);

  return majors
    .map((major: any) => {
      const majorVector = majorsToVector(major.skills);
      const similarity = cosineSimilarity(userVector, majorVector);
      return { ...major, similarity };
    })
    .sort(
      (a: { similarity: number }, b: { similarity: number }) =>
        b.similarity - a.similarity
    );
};

export const calculateCosineSimilarity = (vecA: number[], vecB: number[]) => {
  return cosineSimilarity(vecA, vecB);
};
