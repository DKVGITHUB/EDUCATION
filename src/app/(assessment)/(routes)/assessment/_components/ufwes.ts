import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema, FormValues } from "./formSchema";

const useFormWithEducationSchema = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
      ethnic: "",
      gender: undefined,
      hsgradYear: "",
      currAttending: undefined,
      programs: "",
      alprograms: undefined,
      hsprograms: undefined,
      grades: {
        english: undefined,
        socialStudies: undefined,
        mathematics: undefined,
        integratedScience: undefined,
        businessManagement: undefined,
        economics: undefined,
        electiveMathematics: undefined,
        literatureInEnglish: undefined,
        government: undefined,
        history: undefined,
        fineArts: undefined,
        computerStudies: undefined,
        physics: undefined,
        chemistry: undefined,
      },
      regionOfSchool: "",
      typeOfUni: undefined,
      skill: [],
      interest: [],
    },
  });

  return form;
};

export default useFormWithEducationSchema;
