"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Career from "./_components/career";
import College from "./_components/college";
import Major from "./_components/major";
import Program from "./_components/program";

export default function Result() {
  return (
    <div className="max-w-[1380px] w-full my-0 px-5 py-0">
      <div>
        {/* Header with a dynamic title */}
        <div className="bg-[#00aeef] border-[#00aeef]  px-[15px] py-2.5 border-b-transparent border-b border-solid">
          <h1 className="text-white font-semibold">
            {`Majors, Colleges, Careers`}
          </h1>
        </div>
        <div className="p-5">
          <Program />
        </div>
        {/* Content area with tabs for Majors, Colleges, and Careers */}
        <div className="p-5">
          
          <Tabs defaultValue="major">
            <TabsList>
              <TabsTrigger value="major">Majors</TabsTrigger>
              <TabsTrigger value="college">Colleges</TabsTrigger>
              <TabsTrigger value="career">Careers</TabsTrigger>
            </TabsList>
            <TabsContent value="major">
              <Major />
            </TabsContent>
            <TabsContent value="college">
              <College />
            </TabsContent>
            <TabsContent value="career">
              <Career />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
