"use server";

import React from "react";
import Assessment from "./assessment";
import { db } from "@/lib/db";

type Option = { label: string; value: string };

const toDataOptions = (arr: { id: string; name: string }[]): Option[] =>
  arr.map((item) => ({
    label: item.name,
    value: item.name,
  }));

const Page = async () => {
  const hSProgram = await db.hSProgram.findMany();
  const uEProgram = await db.uEProgram.findMany();
  const uRElective = await db.uRElective.findMany();
  const uRSkill = await db.uRSkill.findMany();
  const uRInterest = await db.uRInterest.findMany();

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

  return (
    <Assessment
      HSPrograms={HSPrograms}
      OPPrograms={OPPrograms}
      Programs={Programs}
      electives={electives}
      collegeSkills={collegeSkills}
      interestingCareers={interestingCareers}
      uEProgram={uEProgram}
    />
  );
};

export default Page;
