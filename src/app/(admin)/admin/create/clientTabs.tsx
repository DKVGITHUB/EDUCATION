"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DataTable } from "./_components/data_table";
import { db } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface ClientTabsProps {
  hSPrograms: any[];
  uEProgram: any[];
  uRElective: any[];
  uRSkill: any[];
  uRInterest: any[];
}

const ClientTabs: React.FC<ClientTabsProps> = ({
  hSPrograms,
  uEProgram,
  uRElective,
  uRSkill,
  uRInterest,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const HSProgramsSubmit = async (name: string) => {
    try {
      const response = await fetch("/api/hSPrograms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (data) {
        toast({
          title: "Added Successfully",
          description: data.name,
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error creating HS Program:", error);
    }
  };

  const UEProgramsSubmit = async (name: string) => {
    try {
      const response = await fetch("/api/uEPrograms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (data) {
        toast({
          title: "Added Successfully",
          description: data.name,
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error creating UE Program:", error);
    }
  };

  const URElectiveSubmit = async (name: string) => {
    try {
      const response = await fetch("/api/uRelectives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (data) {
        toast({
          title: "Added Successfully",
          description: data.name,
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error creating UE Program:", error);
    }
  };

  const URSkillsSubmit = async (name: string) => {
    try {
      const response = await fetch("/api/uRskills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (data) {
        toast({
          title: "Added Successfully",
          description: data.name,
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error creating UE Program:", error);
    }
  };

  const URInterestsSubmit = async (name: string) => {
    try {
      const response = await fetch("/api/uRinterests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (data) {
        toast({
          title: "Added Successfully",
          description: data.name,
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error creating UE Program:", error);
    }
  };

  const deleteHSProgram = async (id: string) => {
    try {
      const response = await fetch("/api/hSPrograms", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data) {
        toast({
          variant: "destructive",
          title: "Successfully deleted",
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error Deleting HS Program:", error);
    }
  };

  const deleteUEProgram = async (id: string) => {
    try {
      const response = await fetch("/api/uEPrograms", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data) {
        toast({
          variant: "destructive",
          title: "Successfully deleted",
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error Deleting UE Program:", error);
    }
  };

  const deleteURElective = async (id: string) => {
    try {
      const response = await fetch("/api/uRelectives", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data) {
        toast({
          variant: "destructive",
          title: "Successfully deleted",
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error Deleting UR Elective:", error);
    }
  };

  const deleteURSkill = async (id: string) => {
    try {
      const response = await fetch("/api/uRskills", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data) {
        toast({
          variant: "destructive",
          title: "Successfully deleted",
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error Deleting UR Skill:", error);
    }
  };

  const deleteURInterest = async (id: string) => {
    try {
      const response = await fetch("/api/uRinterests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data) {
        toast({
          variant: "destructive",
          title: "Successfully deleted",
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error Deleting UR Interest:", error);
    }
  };

  // Repeat the pattern for the other submission functions (URElective, URSkills, URInterests)

  return (
    <Tabs defaultValue="hsprograms" className="w-full">
      <TabsList>
        <TabsTrigger value="hsprograms">HS Programs</TabsTrigger>
        <TabsTrigger value="unprograms">Undergraduate Programs</TabsTrigger>
        <TabsTrigger value="electives">Electives</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="interests">Interests</TabsTrigger>
      </TabsList>

      <TabsContent value="hsprograms">
        <DataTable
          data={hSPrograms}
          placeholder="Add High School Program"
          onSubmit={HSProgramsSubmit}
          onDelete={deleteHSProgram} // Pass the delete function
        />
      </TabsContent>

      <TabsContent value="unprograms">
        <DataTable
          data={uEProgram}
          placeholder="Add Undergraduate Program"
          onSubmit={UEProgramsSubmit}
          onDelete={deleteUEProgram} // Pass the delete function
        />
      </TabsContent>

      <TabsContent value="electives">
        <DataTable
          data={uRElective}
          placeholder="Add Elective"
          onSubmit={URElectiveSubmit}
          onDelete={deleteURElective} // Pass the delete function
        />
      </TabsContent>

      <TabsContent value="skills">
        <DataTable
          data={uRSkill}
          placeholder="Add Skill"
          onSubmit={URSkillsSubmit}
          onDelete={deleteURSkill} // Pass the delete function
        />
      </TabsContent>

      <TabsContent value="interests">
        <DataTable
          data={uRInterest}
          placeholder="Add Interest"
          onSubmit={URInterestsSubmit}
          onDelete={deleteURInterest} // Pass the delete function
        />
      </TabsContent>
    </Tabs>
  );
};

export default ClientTabs;
