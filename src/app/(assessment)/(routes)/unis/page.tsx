import { db } from "@/lib/db";
import UNIS from "./_components/university";

export default async function UNIVERSITY() {
  const university = await db.unis.findMany({
    select: {
      name: true,
      nickname: true,
      location: true,
      logo: true,
      icon: true,
      website: true,
      type: true,
    },
  });

  return <UNIS university={university} />;
}
