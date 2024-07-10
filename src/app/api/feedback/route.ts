//This line imports the auth function from the @clerk/nextjs/server module. This function likely handles authentication and provides information about the current user.
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

//This line imports the NextResponse class from the next/server module. This class likely represents a response that can be sent back to the client in a Next.js server-side function.
import { NextResponse } from "next/server";

//This line exports an asynchronous function named POST that takes a Request object as an argument. This function likely handles POST requests to create a new course.
export async function POST(req: Request) {
  //This line calls the auth function to get information about the current user, specifically their userId.
  const { userId } = auth();
  //This line uses req.json() to parse the incoming request body as JSON and extract the title property from it.
  const { feedback, name, email } = await req.json();

  try {
    //This line checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
    if (!userId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }

    if (!feedback && !name && !email) {
      return new NextResponse("VALUES NOT FOUND", { status: 401 });
    }

    const feedbackResponse = await db.feedbacks.create({
      data: {
        feedbacks: {
          create: {
            name,
            email,
            feedback,
          },
        },
      },
    });

    // This line returns a NextResponse with a JSON representation of the skill.
    return NextResponse.json(feedbackResponse);
  } catch (error) {
    //This line starts a catch block to handle any errors that occur during the execution of the try block.
    //This line logs the error to the console, with a prefix indicating that it is related to courses.
    console.log("[FEEDBACK]", error);
    //This line returns a NextResponse with an "Internal Server Error" message and a status code of 500 to indicate that an unexpected error occurred.
    return new NextResponse("Internal Error Server", { status: 500 });
  }
}
