import { useForm, UseFormReturn } from "react-hook-form";
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
      gender: "",
      hsgradYear: "",
      currAttending: "",
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
        physics: undefined,
        chemistry: undefined,
        electiveICT: undefined,
        biology: undefined,
        geography: undefined,
        history: undefined,
        government: undefined,
        religiousStudies: undefined,
        french: undefined,
        financialAccounting: undefined,
        costAccounting: undefined,
        management: undefined,
        foodAndNutrition: undefined,
        arts: undefined,
        textiles: undefined,
        managementInLiving: undefined,
        graphicDesign: undefined,
        basketry: undefined,
        leatherwork: undefined,
        sculpture: undefined,
        ceramics: undefined,
        generalAgriculture: undefined,
        animalHusbandry: undefined,
        buildingConstruction: undefined,
        engineering: undefined,
        woodwork: undefined,
      },
      regionOfSchool: "",
      typeOfUni: "",
      skill: [],
      interest: [],
      elective: [],
    },
  });

  return form;
};

export default useFormWithEducationSchema;
