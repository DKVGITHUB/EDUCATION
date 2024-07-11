import { useEffect, useState } from "react";

type CareerRecommendationWithSimilarityAboveZero = {
  name: string;
  similarity: number;
  skills: string[];
};

type UserSkillsOrInterests = string[];

export default function Career() {
  const [careers, setCareers] = useState<
    CareerRecommendationWithSimilarityAboveZero[]
  >([]);
  const [skills, setSkills] = useState<UserSkillsOrInterests[]>([]);

  const [interests, setInterests] = useState<UserSkillsOrInterests[]>([]);

  useEffect(() => {
    const Unparsed: any = localStorage.getItem(
      "CareerRecommendationWithSimilarityAboveZero"
    );
    const unparsedUserSkills: any = localStorage.getItem("SkillsUserChoice");
    const unparsedUserInterests: any = localStorage.getItem(
      "InterestsUserChoice"
    );
    const careers = JSON.parse(Unparsed);
    const skills = JSON.parse(unparsedUserSkills);
    const interests = JSON.parse(unparsedUserInterests);
    setCareers(careers);
    setSkills(skills);
    setInterests(interests);
  }, [careers, skills, interests]);
  return (
    <div>
      {careers.length !== 0 ? (
        <>
          {/* Displaying a heading with the selected skill */}
          <div className="p-2" data-testid="heading">
            These are the careers that you can be successful in based on your
            skill of{" "}
            {skills?.map((skill, i) => (
              <strong key={i} className="px-2 underline">
                {skill}
              </strong>
            ))}{" "}
            and interest of{" "}
            {interests?.map((interest, i) => (
              <strong key={i} className="px-2 underline">
                {interest}
              </strong>
            ))}{" "}
          </div>

          {/* Displaying a list of career names */}
          <ul
            className="grid grid-cols-2  list-disc ml-7"
            data-testid="list-container"
          >
            {careers?.map(
              (
                item: CareerRecommendationWithSimilarityAboveZero,
                i: number
              ) => (
                <li
                  key={i}
                  className="text-sm item-list"
                  data-testid="item-list"
                >
                  {item.name}
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <div className="p-5">
          <h3 className="text-base">
            We can&apos;t provide you with the careers you required.
          </h3>
        </div>
      )}
    </div>
  );
}
