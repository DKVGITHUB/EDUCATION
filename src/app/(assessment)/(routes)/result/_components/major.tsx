import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MajorRecommendationWithSimilarityAboveZero = {
  name: string;
  description: string;
  similarity: number;
  skills: string[];
  careers: string[];
};

type UserSkillsOrInterests = string[];

export default function Major() {
  const [majors, setMajors] = useState<
    MajorRecommendationWithSimilarityAboveZero[]
  >([]);
  const [requestedMajor, setRequestedMajor] =
    useState<MajorRecommendationWithSimilarityAboveZero | null>();
  const [skills, setSkills] = useState<UserSkillsOrInterests[]>([]);

  const [interests, setInterests] = useState<UserSkillsOrInterests[]>([]);

  const [active, setActive] = useState();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const Unparsed: any = localStorage.getItem(
      "MajorRecommendationWithSimilarityAboveZero"
    );
    const unparsedUserSkills: any = localStorage.getItem("SkillsUserChoice");
    const unparsedUserInterests: any = localStorage.getItem(
      "InterestsUserChoice"
    );

    const skills = JSON.parse(unparsedUserSkills);
    const interests = JSON.parse(unparsedUserInterests);
    const majors = JSON.parse(Unparsed);
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
            {majors?.map(
              (item: MajorRecommendationWithSimilarityAboveZero, i: number) => (
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
              )
            )}
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
            We can't provide you with the majors you required.
          </h3>
        </div>
      )}
    </div>
  );
}
