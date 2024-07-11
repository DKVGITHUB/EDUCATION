import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

const History = async () => {
  const { userId } = auth();
  //This line checks if there is no userId (i.e., the user is not authenticated) or if the user is not a mentor. If either condition is true, it returns a NextResponse with an "UNAUTHORIZED" status code (401).
  if (!userId) {
    return redirect("https://comic-marmoset-93.accounts.dev/sign-in");
  }
  const historyData = await db.recommendationHistory.findMany({
    where: {
      userId: userId,
    },
    include: {
      recommendationsMajors: true,
      recommendationsCareers: true,
    },
  });

  const recommendations = historyData.map((history) => ({
    id: history.id,
    majors: history.recommendationsMajors.map((major) => ({
      id: major.id,
      name: major.name,
      description: major.description,
      careers: major.careers,
    })),
    careers: history.recommendationsCareers.map((career) => ({
      id: career.id,
      name: career.name,
      description: career.description,
      careers: career.careers,
    })),
  }));

  const getMajorRecommendationWithMajorById = (recommendationId: string) => {
    const recommendation = recommendations.find(
      (rec) => rec.id === recommendationId
    );
    return recommendation ? recommendation.majors : null;
  };

  const getCareerRecommendationWithCareerById = (recommendationId: string) => {
    const recommendation = recommendations.find(
      (rec) => rec.id === recommendationId
    );
    return recommendation ? recommendation.careers : null;
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-[1380px] w-full mx-auto mt-9 px-7 py-0">
      {/* Mapping through the university data and rendering individual cards */}
      {historyData.length > 0 ? (
        historyData.map((item) => {
          const majorRecommendationWithMajor =
            getMajorRecommendationWithMajorById(item.id);
          const careerRecommendationWithCareer =
            getCareerRecommendationWithCareerById(item.id);
          return (
            <div
              key={item.id}
              className="w-auto h-auto bg-[#F1F2F2] rounded-xl transition unis"
            >
              <div className="p-5">
                <Tabs defaultValue="major">
                  <TabsList>
                    <TabsTrigger value="major">Majors</TabsTrigger>

                    <TabsTrigger value="career">Careers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="major">
                    {/* Displaying a list of career names */}

                    <div className="p-2" data-testid="heading">
                      These are the majors that suits you based on your skill of{" "}
                      {item?.skills?.map((skill, i) => (
                        <strong key={i} className="px-2 underline">
                          {skill}
                        </strong>
                      ))}{" "}
                      and interest of{" "}
                      {item?.interests?.map((interest, i) => (
                        <strong key={i} className="px-2 underline">
                          {interest}
                        </strong>
                      ))}{" "}
                    </div>

                    <div className="p-5">
                      <Tabs defaultValue="major">
                        <TabsList>
                          <TabsTrigger value="major">Majors</TabsTrigger>

                          <TabsTrigger value="career">Careers</TabsTrigger>
                        </TabsList>
                        <TabsContent value="major">
                          <ul
                            className="grid grid-cols-2"
                            data-testid="list-container"
                          >
                            {majorRecommendationWithMajor?.map((major) => (
                              <div
                                key={major.id}
                                className={"p-2 rounded-sm hover:bg-[#F1F2F2]"}
                              >
                                <li className="text-sm font-semibold">
                                  {major.name}
                                </li>
                              </div>
                            ))}
                          </ul>
                        </TabsContent>

                        <TabsContent value="career">
                          <ul
                            className="grid grid-cols-2"
                            data-testid="list-container"
                          >
                            {majorRecommendationWithMajor?.map((major) => (
                              <div
                                key={major.id}
                                className={"p-2 rounded-sm hover:bg-[#F1F2F2]"}
                              >
                                {major.careers.map((item, i) => (
                                  <li key={i} className="text-sm font-semibold">
                                    {item}
                                  </li>
                                ))}
                              </div>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </TabsContent>

                  <TabsContent value="career">
                    <div className="p-2" data-testid="heading">
                      These are the careers that you can be successful in based
                      on your skill of{" "}
                      {item?.skills?.map((skill, i) => (
                        <strong key={i} className="px-2 underline">
                          {skill}
                        </strong>
                      ))}{" "}
                      and interest of{" "}
                      {item?.interests?.map((interest, i) => (
                        <strong key={i} className="px-2 underline">
                          {interest}
                        </strong>
                      ))}{" "}
                    </div>
                    <div className="p-5">
                      <ul
                        className="grid grid-cols-2"
                        data-testid="list-container"
                      >
                        {careerRecommendationWithCareer?.map((career) => (
                          <li
                            key={career.id}
                            className={"p-2 rounded-sm hover:bg-[#F1F2F2]"}
                          >
                            <p className="text-sm font-semibold">
                              {career.name
                                ? career.name
                                : "No career is available for this major"}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          );
        })
      ) : (
        <div>NO ASSESSMENT HISTORY</div>
      )}
    </div>
  );
};

export default History;
