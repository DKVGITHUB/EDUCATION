"use client";

import { useGlobalContext } from "@/app/context/store";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./overview";
import Education from "./education";
import Finance from "./finance";
import Skills from "./skills";
import Schools from "./schools";

type UnisType = {
  name: string | undefined;
  nickname: string | undefined;
  location: string | undefined;
  logo: string | undefined;
  icon: string | undefined;
  website: string | undefined;
  type: string | undefined;
}[];

type SalariesType = {
  MAW: "";
  MHW: "";
  TEN: "";
};

type LastMajorType = {
  name: string | undefined;
  description: string | undefined;
  courses: string[] | [];
  careers: string[] | [];
  salaries: SalariesType;
  schools: UnisType;
};

type MidMajorType = {
  name: string | undefined;
  lastMajor: LastMajorType[] | [];
};

type MajorType = {
  name: string | undefined;
  midMajor: MidMajorType[] | [];
}[];

export default function Dashboard({
  params,
}: {
  params: { careerId: number };
}) {
  // Destructure data from the global context
  const { data } = useGlobalContext();

  // Destructure careerId from params

  const id = params.careerId;
  // State to store major information
  const [majors, setMajors]: any = useState([]);

  // useEffect to update majors state when data changes
  useEffect(() => {
    const unparsed: any = localStorage.getItem("Categorie");
    const major = JSON.parse(unparsed);
    setMajors(major);
  }, [data]);

  return (
    <section>
      <div>
        {/* Display career name and description */}
        <p className="text-xl font-bold">{majors[id]?.name}</p>
        <p className="text-sm mt-4">
          {" "}
          <strong>Job Description :</strong> {majors[id]?.description}
        </p>
      </div>
      <Tabs defaultValue="overview" className="w-full my-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="finance">Salary</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview id={id} />
        </TabsContent>
        <TabsContent value="education">
          <Education id={id} />
        </TabsContent>
        <TabsContent value="schools">
          <Schools id={id} />
        </TabsContent>
        <TabsContent value="skills">
          <Skills id={id} />
        </TabsContent>
        <TabsContent value="finance">
          <Finance id={id} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
