import { db } from "@/lib/db";
import CAREER from "./career";

export default async function CAREERS() {
  const career = await db.career_List.findMany({
    select: {
      id: true,
      name: true,
      categories: true,
    },
  });

  const careersId = await db.career_List.findMany({
    select: {
      id: true,
    },
  });

  return <CAREER career={career} />;
}
