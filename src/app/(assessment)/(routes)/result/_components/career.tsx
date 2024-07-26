import { useEffect, useState } from "react";

type CAREER = {
  name: string;
  similarity: number;
  skills: string[];
};

type SKILLSORINTERESETS = string[];

export default function Career() {
  const [careers, setCareers] = useState<CAREER[]>([]);
  const [skills, setSkills] = useState<SKILLSORINTERESETS[]>([]);

  const [interests, setInterests] = useState<SKILLSORINTERESETS[]>([]);

  useEffect(() => {
    const Unparsed: string | null = localStorage.getItem("CAREERS");
    const unparsedUserSkills: string | null = localStorage.getItem("SKILLS");
    const unparsedUserInterests: string | null =
      localStorage.getItem("INTERESTS");
    const careers = JSON.parse(Unparsed as string);
    const skills = JSON.parse(unparsedUserSkills as string);
    const interests = JSON.parse(unparsedUserInterests as string);
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
            {careers?.map((item: CAREER, i: number) => (
              <li key={i} className="text-sm item-list" data-testid="item-list">
                {item.name}
              </li>
            ))}
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
