"use server";

import { db } from "@/lib/db";
import ClientTabs from "./clientTabs";

const Create = async () => {
  const hSPrograms = await db.hSProgram.findMany();
  const uEProgram = await db.uEProgram.findMany();
  const uRElective = await db.uRElective.findMany();
  const uRSkill = await db.uRSkill.findMany();
  const uRInterest = await db.uRInterest.findMany();

  return (
    <div className="flex items-center">
      {/* Pass data to Client Component */}
      <ClientTabs
        hSPrograms={hSPrograms}
        uEProgram={uEProgram}
        uRElective={uRElective}
        uRSkill={uRSkill}
        uRInterest={uRInterest}
      />
    </div>
  );
};

export default Create;
