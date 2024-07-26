import { useEffect, useRef, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MAJOR = {
  name: string;
  description: string;
  similarity: number;
  skills: string[];
  careers: string[];
};

type SKILLSORINTERESETS = string[];

export default function Major() {
  const [majors, setMajors] = useState<MAJOR[]>([]);
  const [requestedMajor, setRequestedMajor] = useState<MAJOR | null>();
  const [skills, setSkills] = useState<SKILLSORINTERESETS[]>([]);

  const [interests, setInterests] = useState<SKILLSORINTERESETS[]>([]);

  const [active, setActive] = useState();

  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const Unparsed: string | null = localStorage.getItem("MAJORS");
    const unparsedUserSkills: string | null = localStorage.getItem("SKILLS");
    const unparsedUserInterests: string | null =
      localStorage.getItem("INTERESTS");

    const skills = JSON.parse(unparsedUserSkills as string);
    const interests = JSON.parse(unparsedUserInterests as string);
    const majors = JSON.parse(Unparsed as string);
    setSkills(skills);
    setInterests(interests);

    setMajors(majors);
  }, []);

  const getMajor = (name: string, i: any) => {
    // Finding the selected major details
    const major = majors.find((major) => major.name === name) || null;

    // Setting the major state with the selected major details
    setRequestedMajor(major);
    setActive(i);
    setIsModal(true);
  };

  return (
    <div>
      {majors.length !== 0 ? (
        <>
          <div className="p-2" data-testid="heading">
            These are the majors that suits you based on your skill of{" "}
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
          <ul className="grid grid-cols-2" data-testid="list-container">
            {majors?.map((item: MAJOR, i: number) => (
              <li
                key={i}
                className={
                  active === i
                    ? "p-2 rounded-sm bg-[#F1F2F2] w-5 cursor-pointer"
                    : "p-2 rounded-sm hover:bg-[#F1F2F2] w-5 cursor-pointer"
                }
                onClick={() => getMajor(item.name, i)}
              >
                <p className="text-sm font-semibold">{item.name}</p>
              </li>
            ))}
          </ul>
          {isModal && (
            <div>
              <div className="p-5">
                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>

                    <TabsTrigger value="career">Careers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <div className="flex items-center space-x-2">
                      {requestedMajor?.description}
                    </div>
                  </TabsContent>

                  <TabsContent value="career">
                    <div className="p-2">
                      {/* Displaying information about careers associated with the major */}
                      What jobs and careers are associated with a major in{" "}
                      {requestedMajor?.name}
                    </div>
                    <ul className="grid grid-cols-2  list-disc ml-7">
                      {/* Mapping through associated careers and displaying them */}
                      {requestedMajor?.careers?.map((item: any, i: number) => (
                        <li key={i} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="p-5">
          <h3 className="text-base">
            We can&apos;t provide you with the majors you required.
          </h3>
        </div>
      )}
    </div>
  );
}
