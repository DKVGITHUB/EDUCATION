//This line imports the db object from the @/lib/db module. This object likely provides access to a database, possibly for storing course information.
import { calculateCosineSimilarity } from "@/lib/cosineSimilarity";
import { db } from "@/lib/db";
import careers from "@/components/career-skill.json";
import majors from "@/components/major-skill.json";

//This line imports the auth function from the @clerk/nextjs/server module. This function likely handles authentication and provides information about the current user.
import { auth } from "@clerk/nextjs/server";

//This line imports the NextResponse class from the next/server module. This class likely represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";
import { getUniqueAttributes, vectorize } from "@/lib/vectorize";

type RecommendationType = {
  similarity: number;
  name: string;
  description?: string;
  skills: string[];
  interests: string[];
  careers?: string[];
};

//This line exports an asynchronous function named POST that takes a Request object as an argument. This function likely handles POST requests to create a new course.
export async function POST(req: Request) {
  //This line calls the auth function to get information about the current user, specifically their userId.
  const { userId } = auth();
  //This line uses req.json() to parse the incoming request body as JSON and extract the title property from it.
  const { skill, interest, school, type } = await req.json();
  try {
    //This line checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
    if (!userId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }

    if (!skill && !interest && !school && !type) {
      return new NextResponse("VALUES NOT FOUND", { status: 401 });
    }
    const uniqueSkills = getUniqueAttributes([...majors, ...careers], "skills");
    const uniqueInterests = getUniqueAttributes(
      [...majors, ...careers],
      "interests"
    );

    const userSkillsVector = vectorize(skill, uniqueSkills);
    const userInterestsVector = vectorize(interest, uniqueInterests);

    const recommendations = [...majors, ...careers]
      .map((item): RecommendationType => {
        const itemSkillsVector = vectorize(item.skills, uniqueSkills);
        const itemInterestsVector = vectorize(item.interests, uniqueInterests);

        const skillSimilarity: any = calculateCosineSimilarity(
          userSkillsVector,
          itemSkillsVector
        );
        const interestSimilarity: any = calculateCosineSimilarity(
          userInterestsVector,
          itemInterestsVector
        );

        return {
          ...item,
          similarity: (skillSimilarity + interestSimilarity) / 2,
        };
      })
      .sort((a, b) => b.similarity - a.similarity);

    const recommendationsWithSimilarityAboveZeroThree = recommendations.filter(
      (rec: any) => rec.similarity > 0.3
    );

    const majorRecommendations =
      recommendationsWithSimilarityAboveZeroThree.filter(
        (item: RecommendationType) => item.careers
      );
    const careerRecommendations =
      recommendationsWithSimilarityAboveZeroThree.filter(
        (item: RecommendationType) => !item.careers
      );

    const unisWithTypeWithRegion = await db.unis.findMany({
      where: {
        type: type,
        location: { contains: school },
      },
    });

    // This line returns a NextResponse with a JSON representation of the skill.
    return NextResponse.json({
      majors: majorRecommendations,
      careers: careerRecommendations,
      unis: unisWithTypeWithRegion,
      skills: skill,
      interests: interest,
    });
  } catch (error) {
    //This line starts a catch block to handle any errors that occur during the execution of the try block.
    //This line logs the error to the console, with a prefix indicating that it is related to courses.
    console.log("[RECOMMEDATION]", error);
    //This line returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error Server", { status: 500 });
  }
}
